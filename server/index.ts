import express, { json } from "express";
import { connectDb } from "./src/db/models";
import router from "./src/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json());
app.use(router);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
