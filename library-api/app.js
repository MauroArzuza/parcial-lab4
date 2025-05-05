import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { bookRoutes } from "./routes/books.js";
import { authorRoutes } from "./routes/authors.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Conexión exitosa");
  })
  .catch((error) => {
    console.log("Error al conectarse a la BD: ", error);
  });

app.use("/libros", bookRoutes);
app.use("/autores", authorRoutes);

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto: ", process.env.PORT);
});
