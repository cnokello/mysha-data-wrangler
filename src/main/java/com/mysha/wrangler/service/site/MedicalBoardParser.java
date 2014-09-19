package com.mysha.wrangler.service.site;

import java.io.File;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysha.wrangler.model.HealthFacility;
import com.mysha.wrangler.model.HealthProfessional;
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

  private boolean shouldParse = false;

  public synchronized void parse(final String fileType, final String msg) throws Exception {
    FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/" + fileType
        + ".log"), msg + "\n", true);

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
        FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
            + fileType + ".log"), "BEGIN: " + msg + "\n", true);

        shouldParse = true;
        return;

      } else if (msg.trim().toUpperCase().matches(patternEnd)) {
        FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
            + fileType + ".log"), "END: " + msg + "\n", true);

        shouldParse = false;
        return;

      }

      // Parse the text
      if (shouldParse == true) {
        if (msg.trim().toUpperCase().matches(patternExclude)) {
          FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
              + fileType + ".log"), "EXCLUDE: " + msg + "\n", true);
        }

        if (msg != null && msg.trim().length() > 0
            && !msg.trim().toUpperCase().matches(patternExclude)) {
          FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
              + fileType + ".log"), "RECORD: " + msg + "\n", true);

          String[] doctorDtl = pattern.split(msg);
          HealthProfessional hp = new HealthProfessional();
          HealthFacility hf = new HealthFacility();

          if (fileType.equals("local.doctor")) {
            hp = new HealthProfessional(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[4],
                doctorDtl[5], doctorDtl[6], doctorDtl[3], "DOCTOR", fileType);

            FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
                + fileType + ".log"), "OBJECT: " + hp.toString() + "\n", true);

          } else if (fileType.equals("foreign.doctor")) {
            hp = new HealthProfessional(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[3],
                doctorDtl[5], "", doctorDtl[2], "DOCTOR", fileType);

            FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
                + fileType + ".log"), "OBJECT: " + hp.toString() + "\n", true);

          } else if (fileType.equals("facility")) {
            hf = new HealthFacility(UUID.randomUUID().toString(), doctorDtl[0], doctorDtl[1],
                doctorDtl[2], doctorDtl[3], doctorDtl[4], "HEALTH_FACILITY");

            FileUtils.writeStringToFile(new File(cfg.getEnv().getProperty("tmp.basedir") + "/"
                + fileType + ".log"), "OBJECT: " + hf.toString() + "\n", true);

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
