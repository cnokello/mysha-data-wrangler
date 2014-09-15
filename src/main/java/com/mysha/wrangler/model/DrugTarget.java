package com.mysha.wrangler.model;

import java.io.Serializable;

public class DrugTarget implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;

  private Long diseaseId;

  public DrugTarget() {
  }

  public DrugTarget(Long id, Long diseaseId) {
    super();
    this.id = id;
    this.diseaseId = diseaseId;
  }

  @Override
  public String toString() {
    return "DrugTarget [id=" + id + ", diseaseId=" + diseaseId + "]";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getDiseaseId() {
    return diseaseId;
  }

  public void setDiseaseId(Long diseaseId) {
    this.diseaseId = diseaseId;
  }
}
