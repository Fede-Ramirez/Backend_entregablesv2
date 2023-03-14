import express, { Express, Request, Response } from "npm:express";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const app: Express = express();

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    res.send('Hola! Probando Deno con Express!');
});

app.post('/', (req: Request, res: Response)=>{
    console.log(req.body);
});

app.listen(config().PORT);
console.log(`Servidor escuchando en el puerto ${config().PORT}`);