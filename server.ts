import express,{Request, Response, NextFunction} from 'express';
import { rotas } from './src/routes';

const app = express();
app.use(express.json())

app.use(rotas)

app.listen(3004, () => {
    console.log("Conectado");
})
