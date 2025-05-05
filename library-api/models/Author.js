import mongoose, { Mongoose } from "mongoose";

const authorSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  bio: { type: String, required: false },
  fechaNacimiento: { type: Date, required: true },
  nacionalidad: { type: String, required: true },
  libros: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

export const Author = mongoose.model("Author", authorSchema);
