import express from 'express';
import { retornaUsuarioExistente } from "../middlware/retornaUsuarioExistente";
import { criarTecnologia, atualizarTecnologia, deletarTecnologia, listarTecnologia, marcarTecnologiaEstudada } from "../controller/Tecnologia";

const rotasTecnologia = express();
rotasTecnologia.use(express.json())


rotasTecnologia.post('/tecnologias', retornaUsuarioExistente, criarTecnologia);

rotasTecnologia.get('/tecnologias', retornaUsuarioExistente, listarTecnologia)

rotasTecnologia.put('/tecnologias/:id', retornaUsuarioExistente, atualizarTecnologia)

rotasTecnologia.patch('/tecnologias/:id/estudada', retornaUsuarioExistente, marcarTecnologiaEstudada);

rotasTecnologia.delete('/tecnologias/:idParaExcluir', retornaUsuarioExistente, deletarTecnologia);

export {rotasTecnologia};