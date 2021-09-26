import express from "express";
import { usuario } from "../app";
import { ClienteModel } from "../models/clienteBdModel"
import { ContaCorrenteModel } from "../models/contaBdModel"
import { ContaCorrentes } from "../ContaCorrentes"
import { Clientes } from "../Clientes"

const router = express.Router();

router.get('/login', (request, response) => {
  response.render("login");
});

router.post('/login', (request, response) => {
  usuario.cpf = request.body.senha
  response.redirect("/transacoes")
})

router.get('/transacoes', (request, response) => {
  response.render("transacoes");
});

router.get('/transferencia', (request, response) => {
  response.render("transferencia", { usuario: usuario });
});

router.post('/transferencia', async (req: any, res: any) => {

  try {

    let clienteOrigemBD = await ClienteModel.findOne({ cpf: req.body.cpfUsuario });
    let contaOrigemBD = await ContaCorrenteModel.findOne({ cpfTitular: req.body.cpfUsuario });

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
    let contaDestinoBD = await ContaCorrenteModel.findOne({ numero: req.body.conta })
    let clienteDestinoBD = await ClienteModel.findOne({ cpf: contaDestinoBD?.cpfTitular })

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

    contaOrigem.transferir(contaDestino, parseFloat(req.body.mount))

    contaOrigemBD!.saldo = contaOrigem.getSaldo()
    contaDestinoBD!.saldo = contaDestino.getSaldo()

    await contaOrigemBD?.save()
    await contaDestinoBD?.save()

    let resposta = { contaOrigem, contaDestino }
    res.redirect("saldo")
  }
  catch (e) {
    res.send("erro")
  }
});

router.get('/saldo', async (request, response) => {
  try {
    const contaUsuario = await ContaCorrenteModel.findOne({ cpfTitular: usuario.cpf })
    response.render("saldo", { saldoUsuario: contaUsuario?.saldo });

  } catch (error) {
    response.send("erro")
  }
});

export { router as minhaRouter }
