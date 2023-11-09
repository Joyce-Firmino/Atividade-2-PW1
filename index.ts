import { log } from "console";
import { prismaClient } from "./prismaClient";
import express,{Request, Response, NextFunction} from 'express';


const app = express();
app.use(express.json())

//Funcão Middleware que checara se existe o usuario requerido no banco de dados
async function retornaUsuarioExistente(req: Request, res: Response, next: NextFunction) {
    const usernome = String(req.headers.usernome);
    const userEncontrado = await prismaClient.usuario.findFirst({
        where: {
            usernome: usernome
        }
    })
    if (userEncontrado !== null){
        req.userExpr = userEncontrado;
        next();
    }else{
        res.status(500).json({ error: "Usuário não existe." });
    } 
}

app.listen(3002, () => {
    console.log("conectado");
})