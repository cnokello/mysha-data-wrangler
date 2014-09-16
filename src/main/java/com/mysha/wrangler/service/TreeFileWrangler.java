package com.mysha.wrangler.service;

import java.io.File;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mysha.wrangler.model.Disease;

@Service(value = "treeFileWrangler")
public class TreeFileWrangler implements Processor {

  private static final Logger LOGGER = Logger.getLogger(TreeFileWrangler.class);

  private @Value("${tmp.basedir}")
  String tmpDir;

  private @Value("${regex.class0}")
  String CLASS0_REGEX;

  private @Value("${regex.class1}")
  String CLASS1_REGEX;

  private @Value("${regex.class2}")
  String CLASS2_REGEX;

  private @Value("${regex.name}")
  String NAME_REGEX;

  private @Value("${pattern.class0}")
  String CLASS0_PATTERN;

  private @Value("${pattern.class1}")
  String CLASS1_PATTERN;

  private @Value("${pattern.class2}")
  String CLASS2_PATTERN;

  private @Value("${pattern.name}")
  String NAME_PATTERN;

  private String class0;

  private String class1;

  private String class2;

  private String name;

  public synchronized void process(final Exchange exchange) throws Exception {

    try {
      final String line = exchange.getIn().getBody(String.class);

      if (line != null && line.trim().startsWith(CLASS0_REGEX)) {
        class0 = line.replaceAll(CLASS0_PATTERN, "");

        // LOGGER.info("\n\nCLASS 0: " + line);

      } else if (line != null && line.startsWith(CLASS1_REGEX)) {
        class1 = line.replaceAll(CLASS1_PATTERN, "");

        // LOGGER.info("\n\nCLASS 1: " + line);

      } else if (line != null && line.startsWith(CLASS2_REGEX)) {
        class2 = line.replaceAll(CLASS2_PATTERN, "");

        // LOGGER.info("\n\nCLASS 2: " + line);

      } else if (line != null && line.startsWith(NAME_REGEX)) {
        name = line.replaceAll(NAME_PATTERN, "");
        final Disease d = new Disease(new java.util.Date().getTime(), class0, class1, class2, name,
            "");

        FileUtils.writeStringToFile(new File(tmpDir + "/diseases.log"), name + "\n", true);
        LOGGER.info("\n\nDISEASE: " + d.toString());

      }

    } catch (Exception e) {
      FileUtils
          .writeStringToFile(new File(tmpDir + "/exceptions.error"),
              String.format("Message: %s\nTrace: %s\n\n", ExceptionUtils.getStackTrace(e)) + "\n",
              true);
    }

  }
}
