package com.mysha.wrangler.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * This class processes tab delimited file and publishes to Kafka for further processing
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "delimitedFileWrangler")
public class DelimitedFileWrangler implements Processor {

  private static final Logger LOGGER = Logger.getLogger(DelimitedFileWrangler.class);

  private Pattern DELIMITER_PATTERN;

  private @Value("${files.delimited.separator}")
  String delimter;

  private @Value("${tmp.basedir}")
  String tmpBaseDir;

  private @Value("${pos.name}")
  int namePosition;

  private @Value("${pos.description}")
  int descriptionPosition;

  private @Value("${pos.type}")
  int typePosition;

  private @Value("${processing.type}")
  String processingType;

  private @Autowired
  KafkaCommService kafkaCommService;

  private static final String TYPE_DRUG = "DRUG";

  private static final String TYPE_DRUG_SIDE_EFFECT = "DRUG_SIDE_EFFECT";

  public void init() {
    DELIMITER_PATTERN = Pattern.compile(delimter);
  }

  public void process(Exchange exchange) throws Exception {
    try {
      if (DELIMITER_PATTERN == null) {
        init();
      }

      final String fileName = exchange.getIn().getHeader(Exchange.FILE_NAME_ONLY, String.class);
      final String line = exchange.getIn().getBody(String.class);

      // Cast the line to string and split into constituent fields
      String processedAt = String.valueOf(new Date().getTime());
      String[] fields = DELIMITER_PATTERN.split(line);

      Map<String, Object> msg = new HashMap<String, Object>();

      if (fileName.toUpperCase().contains(TYPE_DRUG_SIDE_EFFECT)) {
        msg.put("type", TYPE_DRUG_SIDE_EFFECT);
      } else if (fileName.toUpperCase().contains(TYPE_DRUG)) {
        msg.put("type", TYPE_DRUG);
      }

      msg.put("id", processedAt);
      msg.put("name", fields[namePosition]);
      msg.put("description", fields[descriptionPosition]);
      msg.put("timestamp", processedAt);
      msg.put("author", "Okello Nelson");

      // Publish to Kafka for additional processing
      kafkaCommService.send(processedAt, msg);

    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }
  }
}
