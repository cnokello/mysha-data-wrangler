package com.mysha.wrangler.service;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysha.wrangler.service.site.CrawledContentLinkParser;
import com.mysha.wrangler.service.site.MedicalBoardParser;

/**
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "crawledContentParser")
public class CrawledContentParser implements Processor {

  private static final Logger LOGGER = Logger.getLogger(CrawledContentParser.class);

  private @Autowired
  MedicalBoardParser medicalBoardParser;

  private @Autowired
  CrawledContentLinkParser linkParser;

  public void process(Exchange exchange) throws Exception {

    try {
      final String fileName = exchange.getIn().getHeader("CamelFileAbsolutePath", String.class);
      final String text = exchange.getIn().getBody(String.class);

      LOGGER.info("]O]K]E]L]L]O]] Attempt to parse... : " + fileName);

      String fileType = "";

      if (fileName.trim().toUpperCase().contains("RETENTION")) {
        fileType = "local.doctor";
        medicalBoardParser.parse(fileType, text.trim());

      } else if (fileName.trim().toUpperCase().contains("FOREIGN")) {
        fileType = "foreign.doctor";
        medicalBoardParser.parse(fileType, text.trim());

      } else if (fileName.trim().toUpperCase().contains("FACILITIES")) {
        fileType = "facility";
        medicalBoardParser.parse(fileType, text.trim());

      } else {
        if (fileName.contains(".link.")) {
          linkParser.parseLinks(fileName, text.trim());
        }
      }

      // LOGGER.info("Attempting to parse... " + text);

    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

  }
}
