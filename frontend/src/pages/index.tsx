// frontend/src/pages/index.tsx

import { useEffect, useState } from "react";
import { ProblemsTable } from "@/components/molecules/ProblemsTable";
import { SolutionsTable } from "@/components/molecules/SolutionsTable";
import { Header } from "@/components/atoms/Header";
import { Footer } from "@/components/atoms/Footer";
import { Problem } from "@/utils/interface/Problem";
import { Solution } from "@/utils/interface/Solution";

const Home = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notion/problems`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const problemsData = await problemsResponse.json();
        console.log("Problems data:", problemsData);
        setProblems(problemsData);

        const solutionsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notion/solutions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const solutionsData = await solutionsResponse.json();
        console.log("Solutions data:", solutionsData);
        setSolutions(solutionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>問題の一覧</h1>
        <ProblemsTable problems={problems} />

        <h1>解決策の一覧</h1>
        <SolutionsTable solutions={solutions} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
