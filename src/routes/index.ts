import express from "express"
import { rotasTecnologia } from "./rotasTecnologia"
import { rotasUsuario } from "./rotasUsuario"

const rotas = express();

rotas.use(rotasTecnologia)
rotas.use(rotasUsuario)

export {rotas};