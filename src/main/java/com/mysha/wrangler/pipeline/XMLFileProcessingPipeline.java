package com.mysha.wrangler.pipeline;

import org.apache.camel.builder.RouteBuilder;

public class XMLFileProcessingPipeline extends RouteBuilder {

  @Override
  public void configure() throws Exception {

    from("file:{{files.xml.basedir}}?preMove=inprogress&move=.processed").split()
        .tokenizeXML("drug").streaming().convertBodyTo(String.class).to("bean:xmlFileWrangler");
  }
}
