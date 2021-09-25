import express from "express";
import mongoose from "mongoose";

const app = express();
const porta = 3000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(()=>{
    console.log("Banco conectado")
}).catch((error)=>{
    console.log("Erro ao conectar ao banco"+ error)
})

interface Cliente{
    nomeCompleto: string,
    cpf: string,
    agencia: number,
    contaCorrente: number,
    saldo: number 
}
const usuario = new mongoose.Schema<Cliente>({
    nomeCompleto:{
        type: String,
        required: true,
    },
    cpf:{
        type: String,
        required: true,
    },
    agencia:{
        type: Number,
        required: true,
    },
    contaCorrente:{
        type: Number,
        required: true,
    },
    saldo:{
        type: Number,
        required: true,
    }
})

export const UserModel = mongoose.model<Cliente>('Cliente', usuario);




app.get("/", (req,res)=>{
    res.send("Página inicial")
})

app.listen(porta,()=>{
    console.log("Rodando na porta " + porta)
})

// import {Cliente} from "./cliente"
// import {ContaCorrente} from "./contaCorrente"

// let Nati = new Cliente("Nati Lucas", "111.222.333-44");
// let Lina = new Cliente("Lina", "222.333.444-55");

// let contaNati = new ContaCorrente(123,1,Nati,100)
// let contaLina = new ContaCorrente(321,1,Lina,50)

// console.log(contaNati)
// console.log(contaLina)

// contaNati.transferir(contaLina,50)
// console.log(contaNati)
// console.log(contaLina)



