export interface Problem {
  id: string;
  title: string;
  description: string;
  category: string[];
  user: string;
  date: string;
  status: string;
}

export interface ProblemsTableProps {
  problems: Problem[];
}
