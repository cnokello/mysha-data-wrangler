package com.mysha.wrangler.model;

import java.io.Serializable;

public class ArticleLink implements Serializable {

  private static final long serialVersionUID = 1L;

  private String id;

  private String title;

  private String uri;

  private String source;

  public ArticleLink(String id, String title, String uri, String source) {
    super();
    this.id = id;
    this.title = title;
    this.uri = uri;
    this.source = source;
  }

  @Override
  public String toString() {
    return "ArticleLink [id=" + id + ", title=" + title + ", uri=" + uri + ", source=" + source
        + "]";
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getUri() {
    return uri;
  }

  public void setUri(String uri) {
    this.uri = uri;
  }

  public String getSource() {
    return source;
  }

  public void setSource(String source) {
    this.source = source;
  }

}
