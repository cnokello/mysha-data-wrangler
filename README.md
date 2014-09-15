README
======
Prerequisites
-------------
- Kafka 
- Zookeeper 

Configuration
------------
- Ensure Zookeeper is installed and properly configured
- Ensure Kafka is installed and propely configured
- Refer to http://kafka.apache.org for installation details

- Edit the wrangler config properties located at CLASSPATH:META-INF/cfg.properties

Start Services
--------------
Start Zookeeper: $ZOOKEEPER_HOME/bin/zookeeper-server-start.sh config/zookeeper.properties
Start Kafka: $KAFKA_HOME/bin/kafka-server-start.sh config/server.properties
To use Kafka console consumers, start the consumser client: $KAFKA_HOME/bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic drugs --from-beginning


Run
-----
mvn clean install camel:run

Deploy
------


