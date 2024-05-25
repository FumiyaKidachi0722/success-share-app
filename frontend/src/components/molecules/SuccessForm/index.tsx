// frontend/src/components/molecules/SuccessForm/index.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/atoms/Button";
import { BackToHomeButton } from "@/components/atoms/BackToHomeButton";
import styles from "./SuccessForm.module.css";

export const SuccessForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problemId, setProblemId] = useState("");
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notion/success`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        problemId,
        user,
        date,
        categories,
      }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>新しい成功体験を投稿</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="成功体験のタイトル"
          required
          className={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="成功体験の詳細"
          required
          className={styles.textarea}
        />
        <input
          type="text"
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
          placeholder="関連する問題のID"
          required
          className={styles.input}
        />
        <div className={styles.categorySection}>
          <label>カテゴリ</label>
          <label>
            <input
              type="checkbox"
              value="API"
              onChange={handleCategoryChange}
            />
            API
          </label>
          <label>
            <input
              type="checkbox"
              value="Integration"
              onChange={handleCategoryChange}
            />
            Integration
          </label>
          <label>
            <input
              type="checkbox"
              value="Solution"
              onChange={handleCategoryChange}
            />
            Solution
          </label>
        </div>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="投稿者"
          required
          className={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />
        <Button type="submit" variant="primary">
          投稿
        </Button>
      </form>
      <BackToHomeButton />
    </div>
  );
};
