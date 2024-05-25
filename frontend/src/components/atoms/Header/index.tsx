// frontend/src/components/atoms/Header/index.tsx

import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>アプリケーションヘッダー</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/">ホーム</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/post">問題</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/success">解決策</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
