import { ClienteModel } from "../models/clienteBdModel"
import { ContaCorrenteModel } from "../models/contaBdModel"
import { ContaCorrentes } from "../ContaCorrentes"
import { Clientes } from "../Clientes"
import { app } from "../app"

const Operacao = (req: any, res: any) => {
    res.send("deu certo")
}

const Transferencia = (req: any, res: any) => {res.send("Transferencia")}
const Saldo = (req: any, res: any) => {res.send("Saldo")}

export {
    Operacao,
    Transferencia,
    Saldo
};
