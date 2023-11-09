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



//criando um novo usuario
app.post('/users', async (req,res) => {
    const {nome, usernome} = req.body 
    const comparaUser= await prismaClient.usuario.findFirst({
        where: {
            nome: nome,
        }
    })
    if(comparaUser !== null){
       return res.status(400).json({error: "Usuário já existe cadastre um novo usuário!"})
    }
    const novoClient = await prismaClient.usuario.create({
        data:{
            nome,
            usernome,
            tecnologias: {
                create: []
            }
        }
       });
    return res.status(201).json(novoClient)
})



// Criando uma nova tecnologia
app.post('/tecnologias', retornaUsuarioExistente, async (req, res) => {
    try {
        const { titulo, dtPrazoFinal } = req.body;
        const novaTecnologia = await prismaClient.tecnologia.create({
            data: {
                titulo,
                marcarEstudado: false,
                dtPrazoFinal: new Date(dtPrazoFinal).toISOString(),
                usuarioId: req.userExpr.id
            }
        });

        return res.status(201).json(novaTecnologia);
    } catch (error) {
        return res.status(400).json({ error: "Tecnologia não foi criada" });
    }
});



app.listen(3002, () => {
    console.log("conectado");
})