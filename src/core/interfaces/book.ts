export interface IBook {
  id?: string;
  title: string;
  author: string;
  genre: string;
  published_date: Date;
  summary?: string;
  average_rating?: number;
  created_at?: Date;
  updated_at?: Date;
}

