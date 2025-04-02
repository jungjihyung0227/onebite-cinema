import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneMovie from "@/lib/fetch-one-movie";
import Head from "next/head";
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
  const router = useRouter();

  if (router.isFallback) {
    <Head>
      <title>한입시네마</title>
      <meta property="og:image" content="/thumbnail.png" />
      <meta property="og:title" content="한입시네마" />
      <meta
        property="og:description"
        content="지금 바로 한입시네마에서 다양한 영화를 즐기세요!"
      />
    </Head>;
  }
  if (!movie) return <>문제가 발생했습니다. 다시 시도하세요.</>;
  const {
    id,
    title,
    subTitle,
    description,
    releaseDate,
    genres,
    company,
    posterImgUrl,
    runtime,
  } = movie;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.img_container} key={id}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} alt={title} />
        </div>

        <h2>{title}</h2>
        <p>
          {releaseDate} / {genres.join(", ")} /{runtime}분
        </p>

        <p>{company}</p>

        <p style={{ fontWeight: "bold" }}>{subTitle}</p>

        <p>{description}</p>
      </div>
    </>
  );
}
