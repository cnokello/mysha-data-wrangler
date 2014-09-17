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

public class WebDownloadProcessor implements Callable<Long> {

  private static final Logger LOGGER = Logger.getLogger(WebDownloadProcessor.class);

  private String baseUrl;

  private String baseDir;

  private int depth;

  private volatile ContentHandler textHandler = new BodyContentHandler();

  private volatile LinkContentHandler linkHandler = new LinkContentHandler();

  private volatile Metadata metadata = new Metadata();

  private volatile ParseContext parseContext = new ParseContext();

  private volatile HtmlParser parser = new HtmlParser();

  private volatile int depthCount = 0;

  public WebDownloadProcessor(String baseUrl, String baseDir, int depth) {
    this.baseUrl = baseUrl;
    this.baseDir = baseDir;
    this.depth = depth;
  }

  public Long call() throws Exception {
    LOGGER.info("Starting to download: " + baseUrl);
    try {
      textHandler = new BodyContentHandler();
      linkHandler = new LinkContentHandler();

      TeeContentHandler teeHandler = new TeeContentHandler(linkHandler, textHandler);

      URL url = new URL(baseUrl);
      InputStream is = url.openStream();
      parser.parse(is, teeHandler, metadata, parseContext);

      String fileName = UUID.randomUUID().toString();
      FileUtils.writeStringToFile(
          new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/" + fileName
              + ".txt"), textHandler.toString(), true);

      List<Link> links = linkHandler.getLinks();
      for (Link link : links) {
        FileUtils.writeStringToFile(
            new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                + fileName + ".link.txt"), link.getText() + " : " + link.getUri() + "\n", true);
      }

      if (links != null && links.size() > 0) {
        getPages(links);
      }

    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

    return 1l;
  }

  public synchronized int getPages(final List<Link> links) {
    if (depthCount > 3)
      return 1;

    Set<Link> newLinks = new HashSet<Link>();
    for (Link link : links) {
      try {
        TeeContentHandler teeHandler = new TeeContentHandler(linkHandler, textHandler);
        URL url = new URL(link.getUri());

        InputStream is = url.openStream();
        parser.parse(is, teeHandler, metadata, parseContext);

        String fileName = UUID.randomUUID().toString();
        FileUtils.writeStringToFile(
            new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                + fileName + ".txt"), textHandler.toString(), true);

        List<Link> _links = linkHandler.getLinks();
        for (Link _link : links) {
          newLinks.add(_link);
          FileUtils.writeStringToFile(
              new File(baseDir + "/" + baseUrl.trim().replaceAll("[^a-zA-Z0-9]+", ".") + "/"
                  + fileName + ".link.txt"), _link.getText() + " : " + _link.getUri() + "\n", true);
        }

      } catch (Exception e) {
        LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
            ExceptionUtils.getStackTrace(e)));
      }

    }

    depthCount++;
    getPages(new ArrayList<Link>(newLinks));

    return 0;
  }
}
