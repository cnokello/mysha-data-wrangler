package com.mysha.wrangler.util.entity;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "drugbank")
public class XMLRecords {

  @XmlElement(required = true)
  protected List<XMLRecord> xmlRecord;

  public List<XMLRecord> getRecord() {
    if (xmlRecord == null) {
      xmlRecord = new ArrayList<XMLRecord>();
    }

    return xmlRecord;
  }
}
