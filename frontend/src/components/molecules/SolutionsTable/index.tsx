import React from "react";
import styles from "./SolutionsTable.module.css";
import { SolutionsTableProps } from "@/utils/interface/Solution";

export const SolutionsTable: React.FC<SolutionsTableProps> = ({
  solutions,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>詳細</th>
          <th>カテゴリー</th>
          <th>ユーザー</th>
          <th>日付</th>
        </tr>
      </thead>
      <tbody>
        {solutions.map((solution) => (
          <tr key={solution.id}>
            <td>{solution.title}</td>
            <td>{solution.description}</td>
            <td>{solution.category.join(", ")}</td>
            <td>{solution.user}</td>
            <td>{solution.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
