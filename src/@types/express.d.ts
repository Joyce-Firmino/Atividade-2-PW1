type Usuario = {
    id: string; 
    nome: String;
    usernome: String;
  }
  type Tecnologia = {
    id:String;
    titulo:String;
    marcarEstudado:Boolean;
    dtPrazoFinal:Date;
    dtCriacao:Date;
  }
  
  declare namespace Express{
    export interface Request{
      userExpr: Usuario;
    }
  }