// src/api/route/book.route.ts

import { Router } from "express";
import * as BookHandler from "../requestHandlers/book";
import { authenticate, authorizeAdmin } from "../middleware/authenticate";

const router = Router();

router.post("/", authenticate, authorizeAdmin, BookHandler.addBook);

router.get("/", BookHandler.getAllBooks);

router.get("/:id", BookHandler.getBook);

router.patch("/:id", authenticate, authorizeAdmin, BookHandler.updateBook);

router.delete("/:id", authenticate, authorizeAdmin, BookHandler.deleteBook);

router.get("/top-rated", BookHandler.getTopRatedBooksHandler)

export { router as bookRoutes };
