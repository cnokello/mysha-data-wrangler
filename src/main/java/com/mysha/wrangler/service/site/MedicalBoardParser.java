package com.mysha.wrangler.service.site;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mysha.wrangler.model.HealthFacility;
import com.mysha.wrangler.model.HealthProfessional;
import com.mysha.wrangler.service.KafkaCommService;
import com.mysha.wrangler.util.CfgUtil;

/**
 * A site specific parser
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "medicalBoardParser")
public class MedicalBoardParser {

  private static final Logger LOGGER = Logger.getLogger(MedicalBoardParser.class);

  private Pattern pattern = Pattern.compile("\t");

  private @Autowired
  CfgUtil cfg;

  private @Autowired
  KafkaCommService kafkaCommService;

  private Gson gson = new Gson();

  private Map<String, Object> map = new HashMap<String, Object>();

  private boolean shouldParse = false;

  public synchronized void parse(final String fileType, final String msg) throws Exception {
    LOGGER.info(msg);

    try {
      // Retrieve demarcation patterns
      final String patternBegin = cfg.getEnv().getProperty(
          "mb.pattern.begin." + fileType.toLowerCase());
      final String patternEnd = cfg.getEnv()
          .getProperty("mb.pattern.end." + fileType.toLowerCase());
      final String patternExclude = cfg.getEnv().getProperty(
          "mb.pattern.exclude." + fileType.toLowerCase());

      // Determine if its the beginning or the end of parsing
      if (msg.trim().toUpperCase().matches(patternBegin)) {
        LOGGER.info("BEGIN: " + msg);

        shouldParse = true;
        return;

      } else if (msg.trim().toUpperCase().matches(patternEnd)) {
        LOGGER.info("END: " + msg);

        shouldParse = false;
        return;

      }

      // Parse the text
      if (shouldParse == true) {
        if (msg.trim().toUpperCase().matches(patternExclude)) {
          LOGGER.info("EXCLUDE: " + msg);

        }

        if (msg != null && msg.trim().length() > 0
            && !msg.trim().toUpperCase().matches(patternExclude)) {
          LOGGER.info("RECORD: " + msg);

          String[] doctorDtl = pattern.split(msg);
          HealthProfessional hp = new HealthProfessional();
          HealthFacility hf = new HealthFacility();

          if (fileType.equals("local.doctor")) {
            hp = new HealthProfessional(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[4],
                doctorDtl[5], doctorDtl[6], doctorDtl[3], "DOCTOR", fileType);

            String hpJson = gson.toJson(hp);
            LOGGER.info("Publishing to Kafka: " + hpJson);

            map = gson.fromJson(hpJson, map.getClass());
            kafkaCommService.send(hp.getId(), map);

            LOGGER.info("Published to Kafaka...: " + hpJson);

          } else if (fileType.equals("foreign.doctor")) {
            hp = new HealthProfessional(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[3],
                doctorDtl[5], "", doctorDtl[2], "DOCTOR", fileType);

            String hpJson = gson.toJson(hp);
            LOGGER.info("Publishing to Kafka...: " + hpJson);

            map = gson.fromJson(hpJson, map.getClass());
            kafkaCommService.send(hp.getId(), map);

            LOGGER.info("Pubslished to Kafka: " + hpJson);

          } else if (fileType.equals("facility")) {
            hf = new HealthFacility(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[1],
                doctorDtl[2], doctorDtl[3], doctorDtl[4], "HEALTH_FACILITY");

            String hfJson = gson.toJson(hf);
            LOGGER.info("Publishingto Kafka...: " + hfJson);

            map = gson.fromJson(hfJson, map.getClass());
            kafkaCommService.send(hf.getId(), map);

            LOGGER.info("Published to Kafka: " + hfJson);

          }

          LOGGER.info("]O]K]E]L]L]O]] " + msg);

        }

      }
    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

  }
}
