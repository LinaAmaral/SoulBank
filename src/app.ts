import express from "express";
import mongoose from "mongoose";
import { minhaRouter } from "./routers/contaRouters";
import path from "path";
 
export const app = express();
const porta = 8000;
const rota = minhaRouter;
const caminhoViews = path.join(__dirname + '/../src/views/pages');
const caminhoPublic = path.join(__dirname + '/../src/public');

app.set("view engine", "ejs");
app.set("views", caminhoViews);
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(caminhoPublic));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(() => {
    console.log("Banco conectado")
}).catch((error) => {
    console.log("Erro ao conectar ao banco" + error)
})

app.use("/",rota)

export var usuario = {cpf:""}

app.listen(porta, () => {
    console.log("Rodando na porta " + porta)
})

module.exports = mongoose



