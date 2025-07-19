export interface IReviewAttributes {
  id?: string;
  userId: string;
  userName: string;
  bookId: string;
  bookName: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateReviewResponse {
  message: string;
  review: {
    id: string;
    bookId: string;
    bookName: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
  };
}
