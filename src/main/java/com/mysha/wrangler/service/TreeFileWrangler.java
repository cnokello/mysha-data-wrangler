package com.mysha.wrangler.service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mysha.wrangler.model.Disease;
import com.mysha.wrangler.model.DrugClass;
import com.mysha.wrangler.util.CfgUtil;

/**
 * Publishes tree-structured files and publishes to Kafka
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "treeFileWrangler")
public class TreeFileWrangler implements Processor {

  private static final Logger LOGGER = Logger.getLogger(TreeFileWrangler.class);

  private @Value("${tmp.basedir}")
  String tmpDir;

  private String class0;

  private String class1;

  private String class2;

  private String name;

  private @Autowired
  KafkaCommService kafkaCommService;

  private static final String TYPE_DISEASE = "DISEASE";

  private static final String TYPE_DRUG = "DRUG";

  private static final String TOPIC_DRUG = "DRUG_CLASS";

  private Gson gson = new Gson();

  private @Autowired
  CfgUtil cfg;

  /**
   * Processing entry point
   */
  public synchronized void process(final Exchange exchange) throws Exception {

    try {
      final String line = exchange.getIn().getBody(String.class);
      final String fileName = exchange.getIn().getHeader(Exchange.FILE_NAME_ONLY, String.class);
      if (fileName.toUpperCase().contains(TYPE_DISEASE)) {
        wrangleDisease(line);

      } else if (fileName.toUpperCase().contains(TYPE_DRUG)) {
        wrangleDrug(line);

      }

    } catch (Exception e) {
      FileUtils
          .writeStringToFile(new File(tmpDir + "/exceptions.error"),
              String.format("Message: %s\nTrace: %s\n\n", ExceptionUtils.getStackTrace(e)) + "\n",
              true);
    }

  }

  /**
   * Wrangles disease data
   * 
   * @param line
   * @throws Exception
   */
  public void wrangleDisease(final String line) throws Exception {
    if (line != null && line.trim().startsWith(cfg.getEnv().getProperty("disease.regex.class0"))) {
      class0 = line.replaceAll(cfg.getEnv().getProperty("disease.pattern.class0"), "");

      LOGGER.info("\n\nCLASS 0: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("disease.regex.class1"))) {
      class1 = line.replaceAll(cfg.getEnv().getProperty("disease.pattern.class1"), "");

      LOGGER.info("\n\nCLASS 1: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("disease.regex.class2"))) {
      class2 = line.replaceAll(cfg.getEnv().getProperty("disease.pattern.class2"), "");

      LOGGER.info("\n\nCLASS 2: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("disease.regex.name"))) {
      name = line.replaceAll(cfg.getEnv().getProperty("disease.pattern.name"), "");
      String id = UUID.randomUUID().toString();
      final Disease d = new Disease(id, class0, class1, class2, name, "", TYPE_DISEASE);
      String dJson = new Gson().toJson(d);

      Map<String, Object> msg = new HashMap<String, Object>();
      kafkaCommService.send(id, gson.fromJson(dJson, msg.getClass()));

      FileUtils.writeStringToFile(new File(tmpDir + "/diseases.log"), name + "\n", true);
      LOGGER.info("\n\nDISEASE: " + dJson);

    }
  }

  /**
   * Wrangles drugs data
   * 
   * @param line
   * @throws Exception
   */
  public void wrangleDrug(final String line) throws Exception {
    if (line != null && line.trim().startsWith(cfg.getEnv().getProperty("drug.regex.class0"))) {
      class0 = line.replaceFirst(cfg.getEnv().getProperty("drug.pattern.class0"), "");

      LOGGER.info("\n\nCLASS 0: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("drug.regex.class1"))) {
      class1 = line.replaceAll(cfg.getEnv().getProperty("drug.pattern.class1"), "");

      LOGGER.info("\n\nCLASS 1: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("drug.regex.class2"))) {
      class2 = line.replaceAll(cfg.getEnv().getProperty("drug.pattern.class2"), "");

      LOGGER.info("\n\nCLASS 2: " + line);

    } else if (line != null && line.startsWith(cfg.getEnv().getProperty("drug.regex.name"))) {
      name = line.replaceAll(cfg.getEnv().getProperty("drug.pattern.name"), "");
      String id = UUID.randomUUID().toString();
      final DrugClass d = new DrugClass(id, class0, class1, class2, name, "", TOPIC_DRUG);
      String dJson = new Gson().toJson(d);

      Map<String, Object> msg = new HashMap<String, Object>();
      kafkaCommService.send(id, gson.fromJson(dJson, msg.getClass()));

      FileUtils.writeStringToFile(new File(tmpDir + "/drugs.log"), name + "\n", true);
      LOGGER.info("\n\nDRUG: " + dJson);

    }
  }
}
