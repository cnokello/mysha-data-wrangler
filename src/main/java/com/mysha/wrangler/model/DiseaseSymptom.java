package com.mysha.wrangler.model;

import java.io.Serializable;

public class DiseaseSymptom implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;

  private Long diseaseId;

  private String symptom;

  public DiseaseSymptom() {
  }

  public DiseaseSymptom(Long id, Long diseaseId, String symptom) {
    super();
    this.id = id;
    this.diseaseId = diseaseId;
    this.symptom = symptom;
  }

  @Override
  public String toString() {
    return "DiseaseSymptom [id=" + id + ", diseaseId=" + diseaseId + ", symptom=" + symptom + "]";
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

  public String getSymptom() {
    return symptom;
  }

  public void setSymptom(String symptom) {
    this.symptom = symptom;
  }

}
