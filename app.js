import mysql from 'mysql2/promise';
import express from 'express';
import dotenv from 'dotenv';
import tasksRoutes from './routes/tasks.js';

dotenv.config();
const app = express();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const routes = tasksRoutes(connection);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PROJECT_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
