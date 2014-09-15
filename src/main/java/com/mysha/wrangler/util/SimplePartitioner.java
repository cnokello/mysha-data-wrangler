package com.mysha.wrangler.util;

import kafka.producer.Partitioner;
import kafka.utils.VerifiableProperties;

public class SimplePartitioner implements Partitioner {

  public SimplePartitioner(VerifiableProperties props) {

  }

  public int partition(Object key, int a_numPartitions) {

    return 0;
  }

}