package com.mysha.wrangler.pipeline;

import org.apache.camel.builder.RouteBuilder;

public class FileProcessingPipeline extends RouteBuilder {

  @Override
  public void configure() throws Exception {

    // Delimited file processing pipeline
    from("file:{{files.basedir.delimited}}?preMove=inprogress&move=.processed").split()
        .tokenize("\n").to("bean:delimitedFileWrangler");

    // XML file processing pipeline
    from("file:{{files.basedir.xml}}?preMove=inprogress&move=.processed").split()
        .tokenizeXML("drug").streaming().convertBodyTo(String.class).to("bean:xmlFileWrangler");

    // Tree structured file processing pipeline
    // Without explicit conversion of character set, there's likely to be partial processing
    from(
        "file:{{files.basedir.tree}}?preMove=inprogress&move=.processed&readLock=true&readLockTimeout=100000&delay=60000")
        .onException(Exception.class).handled(true).to("bean:pipelineExceptionHandler").end()
        .convertBodyTo(byte[].class, "utf-8").split().tokenize("\n", 1).streaming()
        .convertBodyTo(String.class).to("bean:treeFileWrangler");
  }

}
