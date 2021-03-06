package com.mysha.wrangler.service.web;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysha.wrangler.util.CfgUtil;

/**
 * This class sets up and commences the crawling process. A crawling for each URL is commenced in a
 * separate thread.
 * 
 * To tell if the crawl process for a URL is complete, the Callable interface is used
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "webDownloadController")
public class WebDownloadController implements Processor {

  private static final Logger LOGGER = Logger.getLogger(WebDownloadController.class);

  private @Autowired
  CfgUtil cfg;

  private ExecutorService executor;

  public synchronized void process(Exchange exchange) throws Exception {
    LOGGER.info("Setting up web crawling...");

    try {

      int crawlDepth = Integer.parseInt(cfg.getEnv().getProperty("web.crawl.depth"));
      executor = Executors.newFixedThreadPool(crawlDepth);
      String baseDir = cfg.getEnv().getProperty("tmp.basedir");

      List<String> urlsToCrawl = Arrays.asList(cfg.getEnv().getProperty("web.crawl.urls")
          .split(","));
      for (String url : urlsToCrawl) {
        executor.submit(new WebDownloadProcessor(url, baseDir, crawlDepth, cfg));

        LOGGER.info("URL: " + url);
      }
    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

  }
}
