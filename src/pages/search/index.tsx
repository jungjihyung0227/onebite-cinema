import SearchableLayout from "@/component/searchable-layout";

import style from "./index.module.css";
import MovieItem from "@/component/movie-item";

import {} from "next";
import fetchMovies from "@/lib/fetch-movies";
import { useEffect, useState } from "react";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마 - 검색결과" />
        <meta
          property="og:description"
          content="지금 바로 한입시네마에서 다양한 영화를 즐기세요!"
        />
      </Head>
      <div className={style.img_container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} data={movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
