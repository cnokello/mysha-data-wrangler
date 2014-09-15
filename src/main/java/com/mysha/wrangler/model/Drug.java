package com.mysha.wrangler.model;

import com.thoughtworks.xstream.annotations.XStreamAlias;

public class Drug {

  private String sid;

  @XStreamAlias("name")
  private String name;

  @XStreamAlias("description")
  private String description;

  @XStreamAlias("indication")
  private String indication;

  @XStreamAlias("pharmacodynamics")
  private String pharmacoDynamics;

  @XStreamAlias("mechanism-of-action")
  private String actionMechanism;

  @XStreamAlias("toxicity")
  private String toxicity;

  @XStreamAlias("metablism")
  private String metabolism;

  @XStreamAlias("absorption")
  private String absorption;

  @XStreamAlias("route-of-elimination")
  private String eliminationRoute;

  @XStreamAlias("half-life")
  private String halfLife;

  @XStreamAlias("volume-of-distribution")
  private String distributionVolume;

  public Drug() {
  }

  @Override
  public String toString() {
    return "Drug [id=" + sid + ", name=" + name + ", description=" + description + ", indication="
        + indication + ", pharmacoDynamics=" + pharmacoDynamics + ", actionMechanism="
        + actionMechanism + ", toxicity=" + toxicity + ", metabolism=" + metabolism
        + ", absorption=" + absorption + ", eliminationRoute=" + eliminationRoute + ", halfLife="
        + halfLife + ", distributionVolume=" + distributionVolume + "]";
  }

  public Drug(String name, String description) {
    super();
    this.name = name;
    this.description = description;
  }

  public String getName() {
    return name;
  }

  public String getId() {
    return sid;
  }

  public void setId(String id) {
    this.sid = id;
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

  public String getIndication() {
    return indication;
  }

  public void setIndication(String indication) {
    this.indication = indication;
  }

  public String getPharmacoDynamics() {
    return pharmacoDynamics;
  }

  public void setPharmacoDynamics(String pharmacoDynamics) {
    this.pharmacoDynamics = pharmacoDynamics;
  }

  public String getActionMechanism() {
    return actionMechanism;
  }

  public void setActionMechanism(String actionMechanism) {
    this.actionMechanism = actionMechanism;
  }

  public String getToxicity() {
    return toxicity;
  }

  public void setToxicity(String toxicity) {
    this.toxicity = toxicity;
  }

  public String getMetabolism() {
    return metabolism;
  }

  public void setMetabolism(String metabolism) {
    this.metabolism = metabolism;
  }

  public String getAbsorption() {
    return absorption;
  }

  public void setAbsorption(String absorption) {
    this.absorption = absorption;
  }

  public String getEliminationRoute() {
    return eliminationRoute;
  }

  public void setEliminationRoute(String eliminationRoute) {
    this.eliminationRoute = eliminationRoute;
  }

  public String getHalfLife() {
    return halfLife;
  }

  public void setHalfLife(String halfLife) {
    this.halfLife = halfLife;
  }

  public String getDistributionVolume() {
    return distributionVolume;
  }

  public void setDistributionVolume(String distributionVolume) {
    this.distributionVolume = distributionVolume;
  }

}
