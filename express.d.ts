type Usuario = {
    id: string; 
    nome: String;
    usernome: String;
  }
  type Tecnologia = {
    cpf:string;
    name:string;
    id:string;
  }
  
  declare namespace Express{
    export interface Request{
      userExpr: Usuario;
    }
  }