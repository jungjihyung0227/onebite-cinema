import SearchableLayout from "@/component/searchable-layout";
import React from "react";
import MovieItem from "@/component/movie-item";
import { MovieData } from "@/types";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import Head from "next/head";

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
    revalidate: 60,
  };
};
export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="지금 바로 한입시네마에서 다양한 영화를 즐기세요!"
        />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
