import { Router } from "express";
import * as ReviewHandler from '../requestHandlers/review'
import { authenticate } from "../middleware/authenticate";
const router = Router();

router.post('/', authenticate, ReviewHandler.createOrUpdateReview);

router.get("/:bookId", ReviewHandler.getReviews);

router.get("/rating/:bookId", ReviewHandler.getAverageRating);

router.delete("/:bookId", authenticate, ReviewHandler.deleteReview)

export {router as reviewRoutes};