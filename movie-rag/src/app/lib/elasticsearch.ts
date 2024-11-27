import {
    ElasticVectorSearch,
    type ElasticClientArgs,
  } from "@langchain/community/vectorstores/elasticsearch";
  import { Document } from "@langchain/core/documents";
  
  import { OllamaEmbeddings } from "@langchain/ollama";
  
  import { Client, type ClientOptions } from "@elastic/elasticsearch";
  
  // Initialize Ollama embeddings for the query
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
    indexName: process.env.INDEX_NAME,
    vectorSearchOptions: {
      engine: "hnsw",
      similarity: "dot_product", //Default cosine
    },
  };
  
  const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);
  
  /**
   * Example search function to find relevant movies
   * @param text: prompt to be used for similarity search
   * @returns 
   */
  export async function findRelevantMovies(text: string): Promise<Document[]> {
    try {
      const filter = [
        {
          operator: "match",
          field: "isAdult",
          value: false
        }
      ];
  
      const similaritySearchResults = await vectorStore.similaritySearch(
        text,
        1,
        filter
      );
      return similaritySearchResults;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  