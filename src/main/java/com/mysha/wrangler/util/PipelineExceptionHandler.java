package com.mysha.wrangler.util;

import java.io.File;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service(value = "pipelineExceptionHandler")
public class PipelineExceptionHandler implements Processor {

  private @Value("${tmp.basedir}")
  String tmpDir;

  public void process(Exchange exchange) throws Exception {
    String e = exchange.getIn().getBody(String.class);

    FileUtils.writeStringToFile(new File(tmpDir + "/exceptions.error"), e + "\n", true);

  }

}
