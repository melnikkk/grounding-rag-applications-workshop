import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

import { findRelevantMovies } from "../../lib/elasticsearch";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Ollama community provider
const ollama = createOllama({
  baseURL: "http://localhost:11434/api", // Default
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const errorMessage = "I don't know what you're talking about, HAL.";

  if (messages.length === 0) {
    return {
      message: errorMessage,
    }
  }

  const documents = await findRelevantMovies(messages[0].content);

  try {
    const result = streamText({
      model: ollama("smollm2"),
      system: `You are a helpful movie trivial assistant that loves to recommend movies to people. 
      Check your knowledge base before answering any questions.
      If no relevant information is found in the tool calls, respond, "${errorMessage}"
      Only respond to questions using the these documents: ${documents}`,
      messages
    });

    return result.toDataStreamResponse();
  } catch (e) {
    console.error(e);
    return {
      message: errorMessage,
    };
  }
}
