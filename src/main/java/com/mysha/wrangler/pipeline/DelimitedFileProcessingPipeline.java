package com.mysha.wrangler.pipeline;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Value;

public class DelimitedFileProcessingPipeline extends RouteBuilder {

  private @Value("${files.delimited.basedir}")
  String delimitedFilesBaseDir;

  @Override
  public void configure() throws Exception {

    from("file:" + delimitedFilesBaseDir + "?preMove=inprogress&move=.processed").split()
        .tokenize("\n").to("bean:delimitedFileWrangler");
  }

}
