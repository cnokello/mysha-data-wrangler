package com.mysha.wrangler.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

/**
 * Manages configuraton properties of the application
 * 
 * @author nelson.okello
 * 
 */
@Configuration
@PropertySource({ "classpath:META-INF/cfg.properties" })
@Service(value = "cfgUtil")
public class CfgUtil {

  private @Autowired
  Environment env;

  public Environment getEnv() {
    return env;
  }

}
