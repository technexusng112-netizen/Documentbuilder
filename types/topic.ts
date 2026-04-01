export type TopicDto = {
  id: string;
  title: string;
  abstract: string;
  level: "UNDERGRADUATE" | "POSTGRADUATE";
  tags: string[];
  category: string;
  university: string;
  faculty: string;
  department: string;
  createdAt: string;
};
