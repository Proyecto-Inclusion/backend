import express from "express";
import cors from "cors";

import { config } from "dotenv";
import rutaMain from "./routes/index.js";

config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 6000);

app.use(cors());

app.use("/", rutaMain);

export default app;