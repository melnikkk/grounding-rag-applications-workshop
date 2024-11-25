"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch_1 = require("@langchain/community/vectorstores/elasticsearch");
var documents_1 = require("@langchain/core/documents");
var ollama_1 = require("@langchain/ollama");
var elasticsearch_2 = require("@elastic/elasticsearch");
// Initialize Ollama embeddings
var ollamaEmbeddings = new ollama_1.OllamaEmbeddings({
    model: "mxbai-embed-large", // Default value
    baseUrl: "http://localhost:11434", // Default value
});
// Initialize Langchain and Elasticsearch
var config = {
    node: process.env.ELASTIC_DEPLOYMENT,
};
if (process.env.ELASTIC_API_KEY) {
    config.auth = {
        apiKey: process.env.ELASTIC_API_KEY,
    };
}
var clientArgs = {
    client: new elasticsearch_2.Client(config),
    indexName: "test", //"movies",
    vectorSearchOptions: {
        engine: "hnsw",
        similarity: "dot_product", //Default cosine
        candidates: 200
    }
};
var vectorStore = new elasticsearch_1.ElasticVectorSearch(ollamaEmbeddings, clientArgs);
// Load documents and split
var document1 = new documents_1.Document({
    pageContent: "This is a document",
    metadata: { source: "tweet" },
});
var document2 = new documents_1.Document({
    pageContent: "This is another document",
    metadata: { source: "news" },
});
var documents = [document1, document2];
// Ingest document with embedding
await vectorStore.addDocuments(documents);
/*ollamaEmbeddings.embedDocuments(documents).then(async (embeddings) => {
  console.log(embeddings);
  // Save embeddings to ElasticSearch
  // Ensure the vector size matches the Elasticsearch index mapping
  await vectorStore.addVectors(embeddings, documents);
});*/ 
