import { Router } from "express";
import rutaUser from "./routes.user.js";

const rutaMain = Router();

rutaMain.use("/", rutaUser)

export default rutaMain;