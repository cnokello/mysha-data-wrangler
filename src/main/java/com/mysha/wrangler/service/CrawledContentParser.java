package com.mysha.wrangler.service;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

  public void process(Exchange exchange) throws Exception {
    final String fileTypeLocal = "local.doctor";
    final String fileTypeForeign = "foreign.doctor";
    final String fileTypeFacility = "facility";

    final String text = exchange.getIn().getBody(String.class);

    // LOGGER.info("Attempting to parse... " + text);
    medicalBoardParser.parse(fileTypeFacility, text.trim());

  }

}
