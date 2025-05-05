import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    if (authors.length === 0) {
      return res.status(204).json({ message: "No hay autores en la BD" });
    }
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: "Autor no encontrado." });
    }
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const postAuthor = async (req, res) => {
  try {
    const { nombre, bio, fechaNacimiento, nacionalidad, libros } = req.body;

    const newAuthor = new Author({
      nombre,
      bio,
      fechaNacimiento,
      nacionalidad,
      libros,
    });
    const saved = await newAuthor.save();
    res.status(201).json(saved);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al ingresar un nuevo autor", error });
  }
};

export const putAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar datos del autor", error });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Autor eliminado con éxito", deletedAuthor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el autor", error });
  }
};

export const authorAddBook = async (req, res) => {
  try {
    const { id, idBook } = req.params;
    const book = Book.findById(idBook);
    const author = Author.findById(id);

    if (!idBook || !id) {
      res.status(204).json({ message: "Datos no encontrados" });
    }

    book.authors.push(author._id);
    await book.save();

    author.libros.push(book);
    await author.save();
    return res.status(201).json(author);
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};
