import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import routes from "./routes/index.routes.js";

import cors from "cors";

const app = express();

dotenv.config();
db();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", routes);

app.listen(3006, () => {
  console.log("Server started on port 3006");
});
