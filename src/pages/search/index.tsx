import SearchableLayout from "@/component/searchable-layout";

import style from "./index.module.css";
import MovieItem from "@/component/movie-item";

import {} from "next";
import fetchMovies from "@/lib/fetch-movies";
import { useEffect, useState } from "react";
import { MovieData } from "@/types";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } }, // 반드시 id는 문자열로 들어감
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // false로 설정하면 없는 id로 접근할 경우 404 에러 페이지로 이동함.
    /**
     * false : 404 Not found
     * blocking: SSR 방식
     * true : SSR 방식 + 데이터가 없는 콜백 상태의 페이지부터 반환
     */
  };
};

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
    <div className={style.img_container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} data={movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
