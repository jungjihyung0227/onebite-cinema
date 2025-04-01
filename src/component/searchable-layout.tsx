import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

const SearchableLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const q = router.query.q as string;

  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <>
      <div className={style.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요 ..."
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button type="submit" onClick={onSubmit}>
          검색
        </button>
      </div>

      <div>{children}</div>
    </>
  );
};

export default SearchableLayout;
