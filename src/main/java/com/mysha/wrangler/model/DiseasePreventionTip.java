package com.mysha.wrangler.model;

import java.io.Serializable;

public class DiseasePreventionTip implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long diseaseId;

  private String tip;

  public DiseasePreventionTip() {
  }

  public DiseasePreventionTip(Long diseaseId, String tip) {
    super();
    this.diseaseId = diseaseId;
    this.tip = tip;
  }

  @Override
  public String toString() {
    return "DiseasePreventionTip [diseaseId=" + diseaseId + ", tip=" + tip + "]";
  }

  public Long getDiseaseId() {
    return diseaseId;
  }

  public void setDiseaseId(Long diseaseId) {
    this.diseaseId = diseaseId;
  }

  public String getTip() {
    return tip;
  }

  public void setTip(String tip) {
    this.tip = tip;
  }

}
