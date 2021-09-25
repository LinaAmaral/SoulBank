import { ClienteModel } from "../models/clienteBdModel"
import { ContaCorrenteModel } from "../models/contaBdModel"
import { ContaCorrentes } from "../ContaCorrentes"
import { Clientes } from "../Clientes"
import {app} from "../app"

exports.Operacao = async (req:, res) => {

    try {
        let clienteOrigemBD = await ClienteModel.findOne({ cpf: "456" });
        let contaOrigemBD = await ContaCorrenteModel.findOne({ cpfTitular: "456" });

        let clienteOrigem = new Clientes(
            (clienteOrigemBD?.nomeCompleto) ? clienteOrigemBD?.nomeCompleto : "",
            (clienteOrigemBD?.cpf) ? clienteOrigemBD?.cpf : ""
        );
        let contaOrigem = new ContaCorrentes(
            contaOrigemBD?.numero as number,
            contaOrigemBD?.agencia as number,
            clienteOrigem,
            contaOrigemBD?.saldo as number
        );
        let clienteDestinoBD = await ClienteModel.findOne({ cpf: "123" })
        let contaDestinoBD = await ContaCorrenteModel.findOne({ cpfTitular: "123" })

        let clienteDestino = new Clientes(
            clienteDestinoBD?.nomeCompleto as string,
            clienteDestinoBD?.cpf as string
        )
        let contaDestino = new ContaCorrentes(
            contaDestinoBD?.numero as number,
            contaDestinoBD?.agencia as number,
            clienteDestino,
            contaDestinoBD?.saldo as number
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
};

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