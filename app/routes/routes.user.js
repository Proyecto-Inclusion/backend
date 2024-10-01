import Router from "express";
import { insertarUsuario, mostrarUsuario, mostrarUsuarios } from "../controllers/user.controller.js";

const rutaUser = Router();

rutaUser.get("/", mostrarUsuarios);
rutaUser.get("/:id", mostrarUsuario);
rutaUser.post("/", insertarUsuario)

export default rutaUser;