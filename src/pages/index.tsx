import SearchableLayout from "@/component/searchable-layout";
import React from "react";
import MovieItem from "@/component/movie-item";
import { MovieData } from "@/types";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  };
};
export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>지금 가장 추천하는 영화</h1>
      <div className={style.img_container}>
        {allMovies.map((item: MovieData) => (
          <MovieItem key={item.id} data={item} />
        ))}
      </div>
      <h1>등록된 모든 영화</h1>
      <div className={style.img_container2}>
        {recoMovies.map((item: MovieData) => (
          <MovieItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
