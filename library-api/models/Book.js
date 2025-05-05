import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  resumen: { type: String, required: false },
  genero: { type: String, required: true },
  publicacion: { type: Date, required: true },
  disponible: { type: Boolean, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
