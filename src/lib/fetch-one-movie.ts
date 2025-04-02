import { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: number
): Promise<MovieData | null> {
  const url = `https://onebite-cinema-api-main-tau.vercel.app//movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw Error();
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
