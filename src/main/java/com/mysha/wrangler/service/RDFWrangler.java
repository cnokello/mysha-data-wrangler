package com.mysha.wrangler.service;

import java.io.InputStream;

import org.springframework.stereotype.Service;

import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Property;
import com.hp.hpl.jena.rdf.model.RDFNode;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.rdf.model.Statement;
import com.hp.hpl.jena.rdf.model.StmtIterator;
import com.hp.hpl.jena.util.FileManager;
import com.hp.hpl.jena.vocabulary.VCARD;

@Service(value = "rdfWrangler")
public class RDFWrangler {

  private static String personURI = "http://somewhere/JohnSmith";
  private static String fullName = "John Smith";
  private static String given = "John";
  private static String family = "Smith";

  public static void run() {

    // Create model
    Model model = ModelFactory.createDefaultModel();

    // Create resource
    Resource johnSmith = model.createResource(personURI);

    // Add property
    johnSmith.addProperty(VCARD.FN, fullName);
    johnSmith.addProperty(VCARD.N, model.createResource().addProperty(VCARD.Given, given)
        .addProperty(VCARD.Family, family));

    StmtIterator iter = model.listStatements();
    while (iter.hasNext()) {
      Statement stmt = iter.nextStatement();
      Resource subject = stmt.getSubject();
      Property predicate = stmt.getPredicate();
      RDFNode object = stmt.getObject();

      System.out.println(subject.toString());
      System.out.println(" " + predicate.toString() + " ");
      if (object instanceof Resource) {
        System.out.println(object.toString());
      } else {
        System.out.print("\"" + object.toString() + "\"");
      }

      System.out.println(".");
    }

    model.write(System.out);

  }

  public static void readRDF() throws Exception {
    // Create empty model
    Model model = ModelFactory.createDefaultModel();

    // Use the FileManager to find the input file
    final String inputFile = "/home/nelson.okello/Downloads/Disease.rdf";
    InputStream in = FileManager.get().open(inputFile);
    if (in == null) {
      throw new IllegalArgumentException("File: " + inputFile + " not found");
    }

    // Read the RDF/XML file
    model.read(in, null);

    // Write to the standard out 0726 435 927
    model.write(System.out);

  }

  public static void dbpedia() throws Exception {
    final String service = "http://dbpedia.org/sparql";
    // final String query = "ASK { }";
    final String diseaseQ = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
        + "SELECT ?disease WHERE {" + "?disease rdf:type <http://dbpedia.org/ontology/Disease>"
        + "}";

    final String drugQ = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
        + "SELECT ?drug WHERE {" + "?drug rdf:type <http://dbpedia.org/ontology/Drug>" + "}";

    final String drugsPlusQ = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> "
        + "PREFIX drugbank: <http://www4.wiwiss.fu-berlin.de/drugbank/resource/drugbank/> "
        + "SELECT DISTINCT ?drug_uri ?label ?indication ?mechanismOfAction ?biotransformation ?halfLife "
        + "FROM <http://linkedlifedata.com/resource/drugbank> " + "WHERE { "
        + "?drug_uri a drugbank:drugs . " + "?drug_uri rdfs:label ?label . "
        + "OPTIONAL { ?drug_uri drugbank:brandName ?brandName . } "
        + "OPTIONAL { ?drug_uri drugbank:indication ?indication . } "
        + "OPTIONAL { ?drug_uri drugbank:mechanismOfAction ?mechanismOfAction . } "
        + "OPTIONAL { ?drug_uri drugbank:biotransformation ?biotransformation . } "
        + "OPTIONAL { ?drug_uri drugbank:halfLife ?halfLife . } "
        + "{{FILTER regex(?label, 'warfarin', 'i')} " + "UNION "
        + "{FILTER regex(?brandName, 'warfarin', 'i')}" + "}" + "}";

    QueryExecution qe = QueryExecutionFactory.sparqlService(service, diseaseQ);

    try {
      ResultSet rs = qe.execSelect();
      while (rs.hasNext()) {
        QuerySolution sol = rs.nextSolution();

        Resource r = sol.getResource("?disease");
        if (r != null)
          System.out.println(r.toString());

      }

      System.out.println("Done");

    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      qe.close();
    }
  }

  public static void main(String[] args) throws Exception {
    // run();
    // readRDF();
    dbpedia();
  }
}
