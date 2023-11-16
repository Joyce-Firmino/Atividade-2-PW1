import { prismaClient } from "../database/prismaClient";
import express,{Request, Response, NextFunction} from 'express';

//criando um novo usuario
export async function criaUsuario(req: Request, res: Response) {
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
    
}
