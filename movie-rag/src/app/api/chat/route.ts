import { LangChainAdapter } from 'ai';
import { recommendMovies } from "../../lib/movie-finder";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30; // TODO

export async function POST(req: Request) {
  const { messages } = await req.json();
  const errorMessage = "I don't know what you're talking about, HAL.";

  if (messages.length === 0) {
    return {
      message: errorMessage,
    }
  }

  try {
    const question: string = messages[messages.length - 1].content;
    const stream = await recommendMovies(question);
    
    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (e) {
    console.error(e);
    return {
      message: errorMessage,
    };
  }
}
