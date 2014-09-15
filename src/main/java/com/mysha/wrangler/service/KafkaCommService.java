package com.mysha.wrangler.service;

import java.util.Map;
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service(value = "kafkaCommService")
public class KafkaCommService {

  private static final Logger LOGGER = Logger.getLogger(KafkaCommService.class);

  private Producer<String, String> producer;

  private @Value("${broker.list}")
  String brokerList;

  private @Value("${serializer.class}")
  String serializerClass;

  private @Value("${partitioner.class}")
  String partitionerClass;

  private @Value("${app.topic.name}")
  String appTopicName;

  /**
   * Establishes connection to the Kafka cluster
   */
  public void init() {
    if (producer == null) {
      try {
        LOGGER.info("Establishing connection to Kafka server");

        Properties props = new Properties();
        props.put("metadata.broker.list", brokerList);
        props.put("serializer.class", serializerClass);
        props.put("partitioner.class", partitionerClass);
        props.put("request.required.acks", "1");

        ProducerConfig config = new ProducerConfig(props);
        producer = new Producer<String, String>(config);

        LOGGER.info("Connection to Kafka server established");
      } catch (Exception e) {
        LOGGER.error(String.format("Message: %s\nTrace: %s\n", e.getMessage(),
            ExceptionUtils.getStackTrace(e)));
      }
    }
  }

  /**
   * Publishes a message to a Kafka topic
   * 
   * @param uniqueId
   * @param event
   * @return
   */
  public synchronized boolean send(final String uniqueId, final Map<String, Object> event) {
    init();

    if (producer != null) {
      final String topic = (String) event.get("type");
      LOGGER.info("Publishing a message to Kafka topic... " + topic);

      try {
        if (event != null) {

          final String msg = new Gson().toJson(event);
          KeyedMessage<String, String> data = new KeyedMessage<String, String>(topic, uniqueId, msg);
          producer.send(data);

          LOGGER.info("Published message to Kafka topic... " + topic + " ### " + msg);
        }
      } catch (Exception e) {
        LOGGER.error(String.format("Message: %s\nTrace: %s\n", e.getMessage(),
            ExceptionUtils.getStackTrace(e)));
      }

      LOGGER.info("Message sent to Kafka server");

    } else {
      return false;
    }

    return true;
  }
}
