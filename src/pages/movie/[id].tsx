import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true, // 404 페이지로 이동함.
    };
  }

  return {
    props: {
      movie,
    },
  };
};
export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const router = useRouter();
  // const id = router.query.id;
  if (!movie) return <>찾을 수 없습니다.</>;
  return (
    <>
      <div className={style.img_container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
        >
          <img src={movie.posterImgUrl} alt={movie.title} />
        </div>

        <h2>{movie.title}</h2>
        <p>
          {movie.releaseDate} / {movie.genres.join(", ")} /{movie.runtime}분
        </p>

        <p>{movie.company}</p>

        <p style={{ fontWeight: "bold" }}>{movie.subTitle}</p>

        <p>{movie.description}</p>
      </div>
    </>
  );
}
