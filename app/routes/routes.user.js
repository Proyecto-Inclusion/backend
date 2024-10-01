import Router from "express";
import { insertarUsuario, logueoUsuario, mostrarUsuario, mostrarUsuarios } from "../controllers/user.controller.js";

const rutaUser = Router();

rutaUser.get("/", mostrarUsuarios);
rutaUser.get("/:id", mostrarUsuario);
rutaUser.post("/", insertarUsuario)
rutaUser.post("/login", logueoUsuario)

export default rutaUser;