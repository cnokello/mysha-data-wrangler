package com.mysha.wrangler.service.site;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.mysha.wrangler.model.ArticleLink;
import com.mysha.wrangler.service.KafkaCommService;
import com.mysha.wrangler.util.CfgUtil;

/**
 * This class determines the links to keep based on the number of words that the title of a link
 * contains
 * 
 * @author nelson.okello
 * 
 */
@Service(value = "crawledContentLinkParser")
public class CrawledContentLinkParser {

  private static final Logger LOGGER = Logger.getLogger(CrawledContentLinkParser.class);

  private @Value("${web.crawl.urls}")
  String crawledLinks;

  private @Value("${links.title.min.words}")
  int titleMinWords;

  private @Autowired
  CfgUtil cfg;

  private @Autowired
  KafkaCommService kafkaCommService;

  private Gson gson = new Gson();

  private Map<String, Object> map = new HashMap<String, Object>();

  private Pattern linkPattern = Pattern.compile("]]\\[\\[");

  private Pattern wordSeparator = Pattern.compile("\\s+");

  /**
   * Parses a link, extracts the title and the uri. Based on the uri
   * 
   * @param fileName
   * @param content
   * @throws Exception
   */
  public void parseLinks(final String fileName, final String content) throws Exception {
    LOGGER.info("]]O]K]E]L]L]O]] Parsing link... " + content + "\n");

    final String[] link = linkPattern.split(content);
    if (link.length > 1) {
      final String title = link[0];
      final String uri = link[1];
      String source = "";
      final String[] _sources = crawledLinks.split(",");
      for (final String _source : _sources) {
        if (fileName.contains(source.trim().replaceAll("[^a-zA-Z0-9]+", ".").toLowerCase())) {
          if (uri.startsWith("http")) {
            source = uri;
          } else {
            source = _source + uri;
          }

          break;
        }
      }

      if (getWordCount(title) > titleMinWords) {
        ArticleLink article = new ArticleLink(UUID.randomUUID().toString(), title, uri, source,
            "ARTICLE_LINK");
        String articleJson = gson.toJson(article);
        LOGGER.info("]]O]K]E]L]L]O]] Publishing to Kafka...: " + articleJson + "\n\n");

        map = gson.fromJson(articleJson, map.getClass());
        kafkaCommService.send(article.getId(), map);

        LOGGER.info("]]O]K]E]L]L]O]] Published to Kafka: " + articleJson + "\n\n");

      }
    }

  }

  /**
   * Calculates the number of words in a string/sentence
   * 
   * @param sentence
   * @return
   */
  private int getWordCount(String sentence) {
    return wordSeparator.split(sentence).length;
  }
}
