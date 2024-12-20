export type TNewsResult = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type TNews = {
  status: boolean;
  result: TNewsResult[];
};
