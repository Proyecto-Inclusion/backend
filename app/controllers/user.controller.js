import { success, error } from "../messages/messages.js"
import bcrypt from "bcrypt";
import conexion from "../config/db.config.js";

export const mostrarUsuarios = async(req, res)=>{
    try {
        const response = await conexion.query("CALL SP_Mostrar_Usuarios");
        success(req, res, 200, response[0][0])
    } catch (err){
        error(req, res, 500, "No se pudo mostrar todos los usuarios")
    }
}

export const mostrarUsuario = async(req, res)=>{

    const id = req.params['id'];

    try {
        const response = await conexion.query("CALL SP_Mostrar_Usuario(?)", [id]);
        success(req, res, 200, response[0][0])
    } catch (err){
        error(req, res, 500, "No se pudo mostrar todos los usuarios")
    }
}

export const insertarUsuario = async (req, res) =>{
    const { nombre, correo, contrasena } = req.body;

    const passwordPlain = contrasena;

    const passwordHash = await bcrypt.hash(passwordPlain, 10);

    try {
        const response = await conexion.query("CALL SP_Insertar_Usuario(?, ?, ?)", [nombre, correo, passwordHash])
        success(req, res, 200, "Usuario creado exitosamente")
    } catch (err) {
        error(req, res, 500, "No se pudo crear el usuario")
    }
}