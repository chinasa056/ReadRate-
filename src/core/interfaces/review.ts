export interface IReviewAttributes {
  id?: string;
  user_id: string;
  user_name: string;
  book_id: string;
  book_name: string;
  rating: number;
  comment: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICreateReviewResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
     book_id: string;
    book_name: string;
    user_id: string;
    user_name: string;
    rating: number;
    comment: string;
  };
}
