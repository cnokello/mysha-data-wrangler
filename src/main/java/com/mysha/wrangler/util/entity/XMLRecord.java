package com.mysha.wrangler.util.entity;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "drug", propOrder = { "name", "description" })
public class XMLRecord {

  @XmlAttribute(required = true)
  protected String name;

  @XmlAttribute(required = true)
  protected String description;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return "XMLRecord [name=" + name + ", description=" + description + "]";
  }
}
