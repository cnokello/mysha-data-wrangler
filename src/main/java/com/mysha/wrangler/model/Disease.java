package com.mysha.wrangler.model;

import java.io.Serializable;

public class Disease implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;

  private String shortDescription;

  private String longDescription;

  public Disease() {
  }

  public Disease(Long id, String shortDescription, String longDescription) {
    super();
    this.id = id;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
  }

  @Override
  public String toString() {
    return "Disease [id=" + id + ", shortDescription=" + shortDescription + ", longDescription="
        + longDescription + "]";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getShortDescription() {
    return shortDescription;
  }

  public void setShortDescription(String shortDescription) {
    this.shortDescription = shortDescription;
  }

  public String getLongDescription() {
    return longDescription;
  }

  public void setLongDescription(String longDescription) {
    this.longDescription = longDescription;
  }

}
