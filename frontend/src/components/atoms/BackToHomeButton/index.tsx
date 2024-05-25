// frontend/src/components/atoms/BackToHomeButton/index.tsx

import React from "react";
import { useRouter } from "next/router";
import styles from "./BackToHomeButton.module.css";

export const BackToHomeButton: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <button onClick={handleBackToHome} className={styles.button}>
      Homeに戻る
    </button>
  );
};
