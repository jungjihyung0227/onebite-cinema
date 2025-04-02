import { MovieData } from "@/types";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url =
    "https://onebite-cinema-api-main-pvk2pzjy1-jirung0227s-projects.vercel.app/movie";

  if (q) {
    url += `/search?q=${q}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error();
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
