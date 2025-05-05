import express from "express";
import {
  deleteBook,
  getBookById,
  getBooks,
  postBook,
  putBook,
} from "../controllers/bookController.js";

export const bookRoutes = express.Router();

bookRoutes.get("/", getBooks);
bookRoutes.get("/:id", getBookById);
bookRoutes.post("/", postBook);
bookRoutes.put("/:id", putBook);
bookRoutes.delete("/:id", deleteBook);
