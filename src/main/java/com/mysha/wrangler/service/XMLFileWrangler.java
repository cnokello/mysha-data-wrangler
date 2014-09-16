package com.mysha.wrangler.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mysha.wrangler.model.Drug;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.mapper.MapperWrapper;

/**
 * Parses XML files and then publishes to Kafka for additional processing
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "xmlFileWrangler")
public class XMLFileWrangler implements Processor {

  private static final Logger LOGGER = Logger.getLogger(XMLFileWrangler.class);

  private ObjectMapper objectMapper = new ObjectMapper();

  private @Value("${tmp.basedir}")
  String tmpBaseDir;

  private @Autowired
  KafkaCommService kafkaCommService;

  private @Value("${app.topic.name}")
  String topicName;

  private XStream xStream = new XStream() {
    @Override
    protected MapperWrapper wrapMapper(MapperWrapper next) {
      return new MapperWrapper(next) {
        @Override
        public boolean shouldSerializeMember(Class definedIn, String fieldName) {
          if (definedIn == Object.class) {
            return false;
          }
          return super.shouldSerializeMember(definedIn, fieldName);
        }
      };
    }
  };

  public void process(Exchange exchange) throws Exception {
    try {
      String entry = exchange.getIn().getBody(String.class);

      xStream.alias("drug", Drug.class);
      xStream.processAnnotations(Drug.class);
      Drug drug = (Drug) xStream.fromXML(entry);
      String processedAt = String.valueOf(new Date().getTime());

      Map<String, Object> msg = new HashMap<String, Object>();
      msg = objectMapper.convertValue(drug, msg.getClass());
      msg.put("id", processedAt);
      msg.put("type", topicName);

      // Publish to Kafka for additional processing
      kafkaCommService.send(processedAt, msg);

      LOGGER.info(drug.toString());
    } catch (Exception e) {
      LOGGER.error(String.format("Message: %s\nTrace: %s\n\n", e.getMessage(),
          ExceptionUtils.getStackTrace(e)));
    }

  }
}
