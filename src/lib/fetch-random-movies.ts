import { MovieData } from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = "https://onebite-cinema-api-main-tau.vercel.app/movie/random";

  try {
    const response = await fetch(url);
    if (!response.ok) throw Error();
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
