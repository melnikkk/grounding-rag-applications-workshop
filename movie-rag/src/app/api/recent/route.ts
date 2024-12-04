import { getRecentMovies } from "@/app/lib/elasticsearch";

export async function GET(req: Request) {
  try {
    const recentResponses = await getRecentMovies();
    const movies = recentResponses?.hits.hits.map((doc) => {
      return doc._source;
    })

    return Response.json({ results: movies });
  } catch (e) {
    console.error(e);
    return Response.json({
      results: [],
      errorMessage: e
    });
  }
}
