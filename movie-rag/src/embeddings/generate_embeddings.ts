import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";
import { Document } from "@langchain/core/documents";

import { OllamaEmbeddings } from "@langchain/ollama";

import { Client, type ClientOptions } from "@elastic/elasticsearch";

import fs from "node:fs";
import { MovieCollection } from "./movies";

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
  indexName: process.env.INDEX_NAME,
  vectorSearchOptions: {
    engine: "hnsw",
    similarity: "dot_product", //Default cosine
  },
};

const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

function generateDocumentsFromJson(pathToJSON: string): Document[] {
  try {
    const jsonDocs: MovieCollection = JSON.parse(
      fs.readFileSync(pathToJSON).toString()
    );
    console.log(`Doc count: ${jsonDocs.results.length}`);

    // TODO add splitter?

    return jsonDocs.results.map((doc) => {
      return new Document({
        pageContent: doc.overview,
        metadata: {
          title: doc.title,
          original_language: doc.original_language,
          popularity: doc.popularity,
          releaseDate: new Date(doc.release_date),
          vote_average: doc.vote_average,
          vote_count: doc.vote_count,
          isAdult: doc.adult,
          posterPath: `https://image.tmdb.org/t/p/original${doc.poster_path}`
        },
      });
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

// Ingest document with embedding
async function generateEmbeddings(documents: Document[]): Promise<string[]> {
  try {
    return await vectorStore.addDocuments(documents);
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function findRelevantMovies(text: string): Promise<Document[]> {
  try {
    const filter = [
      {
        operator: "match",
        field: "isAdult",
        value: false,
      },
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

async function main() {
  // Clean up index if it exists
  vectorStore.deleteIfExists();

  // Load data from JSON
  const documents = generateDocumentsFromJson("./data/movies.json");

  // Ingest documents and generate embeddings
  const ids = await generateEmbeddings(documents);
  console.log(`Ingested ${ids.length} documents with embeddings`);

  // Example retrieval
  const topMovieResult = await findRelevantMovies(
    "Find me a movie featuring a dark anti-hero"
  );

  console.log(`The anti-hero movie is: "${topMovieResult[0].metadata.title}"`);
}

main();
