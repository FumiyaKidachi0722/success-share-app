// frontend/src/components/molecules/PostForm/index.tsx

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/atoms/Button";
import { BackToHomeButton } from "@/components/atoms/BackToHomeButton";
import styles from "./PostForm.module.css";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [user, setUser] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notion/post`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        categories,
        user,
        date,
        status,
      }),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>新しい問題を投稿</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="問題のタイトル"
          required
          className={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="問題の詳細"
          required
          className={styles.textarea}
        />
        <div className={styles.categorySection}>
          <h3>カテゴリ</h3>
          <label>
            <input
              type="checkbox"
              value="認証"
              onChange={handleCategoryChange}
            />
            認証
          </label>
          <label>
            <input
              type="checkbox"
              value="ユーザー登録"
              onChange={handleCategoryChange}
            />
            ユーザー登録
          </label>
          <label>
            <input
              type="checkbox"
              value="パフォーマンス"
              onChange={handleCategoryChange}
            />
            パフォーマンス
          </label>
          <label>
            <input
              type="checkbox"
              value="フロントエンド"
              onChange={handleCategoryChange}
            />
            フロントエンド
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
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="ステータス"
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
