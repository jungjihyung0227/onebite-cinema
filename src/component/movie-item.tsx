import { MovieData } from "@/types";
import { useRouter } from "next/router";
import React from "react";

const MovieItem = ({ data }: { data: MovieData }) => {
  const router = useRouter();

  const onClickMovieItem = () => {
    router.push(`/movie/${data.id}`);
  };

  return (
    <img
      src={data.posterImgUrl}
      alt={data.title}
      onClick={onClickMovieItem}
      style={{ cursor: "pointer" }} // UX 향상
    />
  );
};

export default MovieItem;
