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


//Listando tecnologias de um determinado usuario
app.get('/tecnologias', retornaUsuarioExistente,async(req, res) => {
    const {userExpr} = req
    const user= userExpr.id;
    console.log(user);
    
    const comparaUser= await prismaClient.tecnologia.findMany({
        where: {
            usuarioId:user
        }
    })
    
    try {
        res.status(200).json(comparaUser)
    } catch (error) {
        res.status(404).json({error: "Tecnologia não existe"})
    }
})


//Atualizando uma tecnologia de um determinado usuario
app.put('/tecnologias/:id', retornaUsuarioExistente,async(req, res) => {
    const { titulo, dtPrazoFinal } = req.body;
    const {id} = req.params
    try {
        const tecnologiaEncontrada = await prismaClient.tecnologia.update({
            where: {
                id:id
            },
            data:{
                titulo:titulo,
                dtPrazoFinal: dtPrazoFinal
            }
        })

        return res.status(201).json(tecnologiaEncontrada)

    } catch (e) {
        return res.status(404).json({error: "Tecnologia não encontrada"}) 
    }
})



app.listen(3002, () => {
    console.log("conectado");
})