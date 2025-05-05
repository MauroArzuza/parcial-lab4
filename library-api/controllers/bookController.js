import { Book } from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(204).json({ message: "No hay libros en la BD" });
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado." });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const postBook = async (req, res) => {
  try {
    const { titulo, resumen, genero, publicacion, disponible } = req.body;

    const newBook = new Book({
      titulo,
      resumen,
      genero,
      publicacion,
      disponible,
    });
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al crear un nuevo libro", error });
  }
};

export const putBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar datos del libro", error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.status(200).json({ message: "Libro eliminado con éxito", deletedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el libro", error });
  }
};
