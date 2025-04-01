import React from "react";
import style from "./global-layout.module.css";
import Link from "next/link";
const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default GlobalLayout;
