import React from "react";
import styles from "./ProblemsTable.module.css";
import { ProblemsTableProps } from "@/utils/interface/Problem";

export const ProblemsTable: React.FC<ProblemsTableProps> = ({ problems }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>詳細</th>
          <th>カテゴリー</th>
          <th>ユーザー</th>
          <th>日付</th>
          <th>ステータス</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <tr key={problem.id}>
            <td>{problem.title}</td>
            <td>{problem.description}</td>
            <td>{problem.category.join(", ")}</td>
            <td>{problem.user}</td>
            <td>{problem.date}</td>
            <td>{problem.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
