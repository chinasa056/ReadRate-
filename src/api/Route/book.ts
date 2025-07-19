// src/api/route/book.route.ts

import { Router } from "express";
import {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../requestHandlers/book";

const router = Router();

router.post("/", addBook);
router.get("/", getBook);
router.get("/:id", getBooks);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
