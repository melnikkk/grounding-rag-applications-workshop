import { Client, type ClientOptions } from "@elastic/elasticsearch";

// Initialize Elasticsearch
const config: ClientOptions = {
  node: process.env.ELASTIC_DEPLOYMENT || "https://e72e8f4990a1466ab6a422816b7c694d.eu-central-1.aws.cloud.es.io:443",
  auth: {
    apiKey: process.env.ELASTIC_API_KEY || "Yy1UUnE1TUI0b3BKVXFUN2hodHc6cnpYRmxaSzVTRWFjOXMxcWVVRk52UQ==",
  },
};

const client = new Client(config);
const indexName = process.env.INDEX_NAME || "movies-alex-melnik";

/**
 * Retrieves the most popular movies based on average vote
 * @returns most popular 5 movies
 */
export async function getPopularMovies() {
  if (!client || !indexName) {
    console.log('====== HERE ========')
    return;
  }

  const query = {
    index: indexName,
    query: {
      bool: {
        must: [
          {
            range: {
              "metadata.vote_average": {
                gte: 5,
              },
            },
          },
          {
            term: {
              "metadata.chunk": 0,
            },
          },
        ],
      },
    },
    sort: [{ "metadata.popularity": "desc" }],
    size: 4,
    _source: [ "metadata", "text" ]
  };

  return client.search(query);
}