import {
    ElasticVectorSearch,
    type ElasticClientArgs,
  } from "@langchain/community/vectorstores/elasticsearch";
  import { Document } from "@langchain/core/documents";
  
  import { OllamaEmbeddings } from "@langchain/ollama";
  
  import { Client, type ClientOptions } from "@elastic/elasticsearch";
  
  import * as fs from "node:fs";
  
  // Initialize Ollama embeddings
  const ollamaEmbeddings = new OllamaEmbeddings({
    model: "mxbai-embed-large", // Default value
    //baseUrl: "http://localhost:11434", // Default value
  });
  
  // Initialize Langchain and Elasticsearch
  const config: ClientOptions = {
    node: process.env.ELASTIC_DEPLOYMENT,
  };
  
  if (process.env.ELASTIC_API_KEY) {
    config.auth = {
      apiKey: process.env.ELASTIC_API_KEY,
    };
  } 
  
  const clientArgs: ElasticClientArgs = {
    client: new Client(config),
    indexName: "test", //"movies",
    vectorSearchOptions: {
        engine: "hnsw",
        similarity: "dot_product", //Default cosine
    }
  };
  
  const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

// Load documents and split
const document1 = new Document({
    pageContent: "This is a document",
    metadata: { source: "tweet" },
});

const document2 = new Document({
    pageContent: "This is another document",
    metadata: { source: "news" },
});

const document3 = new Document({
    pageContent: "This is a big news story!",
    metadata: { source: "news" },
});

const documents: Document[] = [ document1, document2, document3 ];

// Ingest document with embedding
async function generateEmbeddings(): Promise<string[]> {
    try {
        return await vectorStore.addDocuments(documents);
    } catch(e) {
        console.log(e);
        return [];
    }
}

async function findRelevantNews(text: string): Promise<Document[]> {
    try {
        const filter = [
            {
              operator: "match",
              field: "source",
              value: "news",
            },
          ];
          
          const similaritySearchResults = await vectorStore.similaritySearch(
            text,
            1,
            filter
          );

          return similaritySearchResults
    } catch(e) {
        console.log(e);
        return [];
    }
}

async function main() {
    const ids = await generateEmbeddings();
    console.log(`Ingested ${ids.length} documents with embeddings`);

    const bigNewsStory = await findRelevantNews("Find me the biggest news story!");
    console.log(`The biggest news story is: "${bigNewsStory[0].pageContent}"`)
}

main();