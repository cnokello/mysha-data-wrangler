package com.mysha.wrangler.model;

import java.io.Serializable;

public class DrugSideEffect implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;

  private String sideEffect;

  public DrugSideEffect() {
  }

  public DrugSideEffect(Long id, String sideEffect) {
    super();
    this.id = id;
    this.sideEffect = sideEffect;
  }

  @Override
  public String toString() {
    return "DrugSideEffect [id=" + id + ", sideEffect=" + sideEffect + "]";
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getSideEffect() {
    return sideEffect;
  }

  public void setSideEffect(String sideEffect) {
    this.sideEffect = sideEffect;
  }

}
