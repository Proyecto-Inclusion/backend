import { success, error } from "../messages/messages.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

        if (response[0][0]) {
            const usuario = response[0][0];
            const idUsuario = usuario[0].id_usuario;
            const payload = {
              id_usuario: idUsuario,
              nombre: nombre,
              correo: correo,
            };
      
            const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
              expiresIn: process.env.TOKEN_EXPIRES_IN,
            });
      
            return res
              .status(201)
              .json({ message: "Usuario creado exitosamente", token });
          } else {
            return res.status(200).json({ message: "No se pudo crear el usuario" });
          }
    } catch (err) {
        error(req, res, 500, "No se pudo crear el usuario")
    }
}

export const logueoUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
  
    try {
      const [response] = await conexion.query("CALL SP_Loguear_Usuario(?)", [correo]);
  
      if (response.length === 0 || response[0].length === 0) {
        return res.status(401).json({ message: "Usuario no existe" });
      }
  
      const usuario = response[0][0];

      const match = await bcrypt.compare(contrasena, usuario.contrasena_usuario);
  
      if (!match) {
        return res.status(401).json({ message: "Clave incorrecta" });
      }
  
      const payload = {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo_usuario,
      };
  
      const token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      });
  
      return res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      return res
        .status(500)
        .json({
          message: "Error en el servidor, por favor intentalo de nuevo más tarde",
        });
    }
  };
  