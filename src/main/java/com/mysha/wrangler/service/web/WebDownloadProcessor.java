package com.mysha.wrangler.service.web;

import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.Callable;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.html.HtmlParser;
import org.apache.tika.sax.BodyContentHandler;
import org.apache.tika.sax.Link;
import org.apache.tika.sax.LinkContentHandler;
import org.apache.tika.sax.TeeContentHandler;
import org.xml.sax.ContentHandler;

import com.mysha.wrangler.util.CfgUtil;

/**
 * This class crawls a URL, retrieves its content and links. For each link retrieved, context and
 * links are extracted recursively until a specified loop count is reached.
 * 
 * To read a file located at a remote URL, this classes utilized java.net.URL and
 * java.io.InputStream. To write the read file to the local file system, this class makes use of
 * commons io's FileUtils
 * 
 * @author nelson.okello
 * 
 */
public class WebDownloadProcessor implements Callable<Long> {

  private static final Logger LOGGER = Logger.getLogger(WebDownloadProcessor.class);

  private String baseUrl;

  private String baseDir;

  private int depth;

  private volatile ContentHandler textHandler = new BodyContentHandler(-1);

  private volatile LinkContentHandler linkHandler = new LinkContentHandler();

  private volatile Metadata metadata = new Metadata();

  private volatile ParseContext parseContext = new ParseContext();

  private volatile HtmlParser parser = new HtmlParser();

  private volatile int depthCount = 0;

  private CfgUtil cfg;

  private final String paginatedPrefix = "currpage";

  public WebDownloadProcessor(String baseUrl, String baseDir, int depth, CfgUtil cfg) {
    this.baseUrl = baseUrl;
    this.baseDir = baseDir;
    this.depth = depth;
    this.cfg = cfg;
  }

  /**
   * Entry point into this processor
   */
  public Long call() throws Exception {
    LOGGER.info("Starting to download: " + baseUrl);
    try {

      if (baseUrl != null
          && baseUrl.trim().equals(cfg.getEnv().getProperty("url.health.doctors.local").trim())) {
        getFromPaginated(baseUrl, paginatedPrefix, 1, 194);

      } else if (baseUrl != null
          && baseUrl.trim().equals(cfg.getEnv().getProperty("url.health.doctors.foreign").trim())) {
        getFromPaginated(baseUrl, paginatedPrefix, 1, 57);

      } else if (baseUrl != null
          && baseUrl.trim().equals(cfg.getEnv().getProperty("url.health.facilities").trim())) {
        getFromPaginated(baseUrl, paginatedPrefix, 1, 80);

      } else {

        textHandler = new BodyContentHandler(-1);
        linkHandler = new LinkContentHandler();

        TeeContentHandler teeHandler = new TeeContentHandler(linkHandler, textHandler);

        URL url = new URL(baseUrl);
        InputStream is = url.openStream();
        parser.parse(is, teeHandler, metadata, parseContext);

        String fileName = UUID.randomUUID().toString();
        FileUtils.writeStringToFile(
            new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                + fileName + ".txt"), textHandler.toString(), true);

        List<Link> links = linkHandler.getLinks();
        for (Link link : links) {
          FileUtils.writeStringToFile(
              new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                  + fileName + ".link.txt"), link.getText() + "]][[" + link.getUri() + "\n", true);
        }

        if (links != null && links.size() > 0) {
          getPages(links);
        }
      }

    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

    return 1l;
  }

  /**
   * A recursive method that retrieves the pages and links until a specified depth is reached
   * 
   * @param links
   * @return
   */
  public synchronized int getPages(final List<Link> __links) {
    final Link[] links = __links.toArray(new Link[__links.size()]);

    if (depthCount > 3)
      return 1;

    Set<Link> newLinks = new HashSet<Link>();
    for (final Link link : links) {
      try {

        textHandler = new BodyContentHandler(-1);
        linkHandler = new LinkContentHandler();

        TeeContentHandler teeHandler = new TeeContentHandler(linkHandler, textHandler);
        String urlPrefix = baseUrl.replaceAll("/$", "");
        String uri = link.getUri();

        String urlToRetrieve = urlPrefix + link.getUri();
        if (uri.startsWith("http")) {
          urlToRetrieve = uri;
        }

        LOGGER.info("Retrieving URL... " + urlToRetrieve);

        URL url = new URL(urlToRetrieve);

        InputStream is = url.openStream();
        parser.parse(is, teeHandler, metadata, parseContext);

        String fileName = UUID.randomUUID().toString();
        FileUtils.writeStringToFile(
            new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                + fileName + ".txt"), textHandler.toString(), true);

        LOGGER.info("Retrieved URL: " + urlToRetrieve);
        List<Link> _links = linkHandler.getLinks();
        for (Link _link : _links) {
          newLinks.add(_link);
          FileUtils
              .writeStringToFile(
                  new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                      + fileName + ".link.txt"), _link.getText() + "]][[" + _link.getUri() + "\n",
                  true);
        }

      } catch (Exception e) {
        LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
            ExceptionUtils.getStackTrace(e)));

        depthCount++;
      }

    }

    depthCount++;
    getPages(new ArrayList<Link>(newLinks));

    return 0;
  }

  /**
   * Retrieves specified pages from a paginated site
   * 
   * @param baseUrl
   * @param pageKey
   * @param from
   * @param to
   * @return
   */
  public synchronized int getFromPaginated(final String _baseUrl, final String pageKey,
      final int from, final int to) {

    String fileName = UUID.randomUUID().toString();
    for (int i = from; i <= to; i++) {
      try {
        final String _url = _baseUrl + "?" + pageKey + "=" + i;
        URL url = new URL(_url);
        LOGGER.info("]]]]]]]" + _url);

        textHandler = new BodyContentHandler(-1);
        linkHandler = new LinkContentHandler();

        TeeContentHandler teeHandler = new TeeContentHandler(linkHandler, textHandler);
        InputStream is = url.openStream();
        parser.parse(is, teeHandler, metadata, parseContext);

        FileUtils.writeStringToFile(
            new File(baseDir + "/" + _baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                + fileName + "." + i + ".txt"), textHandler.toString(), true);

        List<Link> _links = linkHandler.getLinks();
        for (Link _link : _links) {
          FileUtils.writeStringToFile(
              new File(baseDir + "/" + _baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                  + fileName + "." + i + ".link.txt"), _link.getText() + "]][[" + _link.getUri()
                  + "\n", true);
        }

      } catch (Exception e) {
        LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
            ExceptionUtils.getStackTrace(e)));
      }
    }

    return 0;
  }
}
