export interface Solution {
  id: string;
  title: string;
  description: string;
  problemId: string;
  user: string;
  date: string;
  category: string[];
}

export interface SolutionsTableProps {
  solutions: Solution[];
}
