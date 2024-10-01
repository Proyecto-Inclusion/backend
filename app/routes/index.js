import { Router } from "express";

const rutaMain = Router();

rutaMain.get("/", (req, res)=>{
    res.send("Hola mundo");
})

export default rutaMain