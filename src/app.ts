import express from "express";
import mongoose from "mongoose";
import { Clientes } from "./Clientes";
import { ContaCorrentes } from "./ContaCorrentes";

const app = express();
const porta = 3000;

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(() => {
    console.log("Banco conectado")
}).catch((error) => {
    console.log("Erro ao conectar ao banco" + error)
})

interface ClientesBdModel {
    nomeCompleto: string,
    cpf: string
}
const schemaCliente = new mongoose.Schema<ClientesBdModel>({
    nomeCompleto: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    }
})
interface ContaCorrentesBdModel {
    numero: number,
    agencia: number,
    saldo: number,
    cpfTitular: string
}

const schemaContaCorrente = new mongoose.Schema<ContaCorrentesBdModel>({
    numero: {
        type: Number,
        required: true,
    },
    agencia: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    },
    cpfTitular: {
        type: String,
        required: true,
    },
})

export const ClienteModel = mongoose.model<ClientesBdModel>('Cliente', schemaCliente);
export const ContaCorrenteModel = mongoose.model<ContaCorrentesBdModel>('ContaCorrente', schemaContaCorrente);

app.get("/", async (req, res) => {

    try {
        let clienteOrigemBD = await ClienteModel.findOne({ cpf: "456" });
        let contaOrigemBD = await ContaCorrenteModel.findOne({ cpfTitular: "456" });

        let clienteOrigem = new Clientes(
            (clienteOrigemBD?.nomeCompleto) ? clienteOrigemBD?.nomeCompleto : "",
            (clienteOrigemBD?.cpf) ? clienteOrigemBD?.cpf : ""
        );
        let contaOrigem = new ContaCorrentes(
            (contaOrigemBD?.numero) ? contaOrigemBD?.numero : 0,
            (contaOrigemBD?.agencia) ? contaOrigemBD?.agencia : 0,
            clienteOrigem,
            (contaOrigemBD?.saldo) ? contaOrigemBD?.saldo : 0
        );
        let clienteDestinoBD = await ClienteModel.findOne({ cpf: "123" })
        let contaDestinoBD = await ContaCorrenteModel.findOne({ cpfTitular: "123" })

        let clienteDestino = new Clientes(
            clienteDestinoBD?.nomeCompleto as string,
            clienteDestinoBD?.cpf!
        )
        let contaDestino = new ContaCorrentes(
            (contaDestinoBD?.numero) ? contaDestinoBD?.numero : 0,
            (contaDestinoBD?.agencia) ? contaDestinoBD?.agencia : 0,
            clienteDestino,
            (contaDestinoBD?.saldo) ? contaDestinoBD?.saldo : 0
        )
        
        contaOrigem.transferir(contaDestino, 10)
        
        contaOrigemBD!.saldo = contaOrigem.getSaldo()
        contaDestinoBD!.saldo = contaDestino.getSaldo()
        
        await contaOrigemBD?.save()
        await contaDestinoBD?.save()

        let resposta = { contaOrigem, contaDestino }
        res.send(resposta)
    }
    catch (e) {
        res.send("erro")
    }
});

app.get("/inserirCliente", (req, res) => {

    let conta = new ContaCorrenteModel();
    conta.numero = 2;
    conta.agencia = 1;
    conta.saldo = 50;
    conta.cpfTitular = "12397879626"

    conta.save((err) => {
        if (err)
            return res.status(500).send("Erro ao cadastrar conta")
        res.send("Conta cadastrado com sucesso");
    })
})

app.listen(porta, () => {
    console.log("Rodando na porta " + porta)
})





