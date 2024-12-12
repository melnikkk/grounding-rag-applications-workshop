import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";

import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

import { Client, type ClientOptions } from "@elastic/elasticsearch";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize Ollama embeddings for the query
const ollamaEmbeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large", // Default value
  baseUrl: "http://localhost:11434", // Default value
});

/**
 * Example search function to find relevant movies
 * @param text: prompt to be used for similarity search
 * @returns
 */
export async function recommendMovies(question: string): Promise<ReadableStream> {
  console.log('==== recommendMovies =====')
}
