import express from 'express';
import { criaUsuario } from '../controller/usuario';

const rotasUsuario = express();
rotasUsuario.use(express.json())

rotasUsuario.post('/users', criaUsuario);

export {rotasUsuario}


