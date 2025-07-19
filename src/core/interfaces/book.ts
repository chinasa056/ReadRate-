export interface IBook {
  id?: string;
  title: string;
  author: string;
  genre: string;
  publishedDate: Date;
  summary?: string;
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

