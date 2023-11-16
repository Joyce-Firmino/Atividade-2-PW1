import { prismaClient } from "../database/prismaClient";
import express,{Request, Response, NextFunction} from 'express';


export async function criarTecnologia (req: Request, res: Response) {
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
}



export async function listarTecnologia(req: Request, res: Response){
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
};

export async function atualizarTecnologia(req: Request, res: Response){
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
};

export async function marcarTecnologiaEstudada(req: Request, res: Response){
    const {id} = req.params;        
    const estudada = true;
    try {
        const tecnologiaEncontrada = await prismaClient.tecnologia.update({
            where: {
                id:id
            },
            data:{
                marcarEstudado:estudada
            }
        })

        return res.status(201).json(tecnologiaEncontrada)

    } catch (e) {
        return res.status(404).json({error: "Tecnologia não encontrada"}) 
    }
};


export async function deletarTecnologia(req: Request, res: Response){
    const { idParaExcluir } = req.params;     
    try {
        const tecnologiaEncontrada = await prismaClient.tecnologia.delete({
            where: {
                id:idParaExcluir
            },
        })

        return res.status(201).json({message: 'Tecnologia deletada com sucesso!'})

    } catch (e) {
        return res.status(404).json({error: "Tecnologia não encontrada"}) 
    }    
};
