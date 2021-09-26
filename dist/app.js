"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var contaRouters_1 = require("./routers/contaRouters");
var path_1 = __importDefault(require("path"));
// import { Clientes } from "./Clientes";
// import { ContaCorrentes } from "./ContaCorrentes";
exports.app = (0, express_1.default)();
var porta = 8000;
var rota = contaRouters_1.minhaRouter;
var caminhoViews = path_1.default.join(__dirname + '/../src/views/pages');
var caminhoPublic = path_1.default.join(__dirname + '/../src/public');
exports.app.set("view engine", "ejs");
exports.app.set("views", caminhoViews);
exports.app.use(express_1.default.urlencoded());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static(caminhoPublic));
console.log(caminhoViews);
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(function () {
    console.log("Banco conectado");
}).catch(function (error) {
    console.log("Erro ao conectar ao banco" + error);
});
exports.app.use("/", rota);
// interface ClientesBdModel {
//     nomeCompleto: string,
//     cpf: string
// }
// const schemaCliente = new mongoose.Schema<ClientesBdModel>({
//     nomeCompleto: {
//         type: String,
//         required: true,
//     },
//     cpf: {
//         type: String,
//         required: true,
//     }
// })
// interface ContaCorrentesBdModel {
//     numero: number,
//     agencia: number,
//     saldo: number,
//     cpfTitular: string
// }
// const schemaContaCorrente = new mongoose.Schema<ContaCorrentesBdModel>({
//     numero: {
//         type: Number,
//         required: true,
//     },
//     agencia: {
//         type: Number,
//         required: true,
//     },
//     saldo: {
//         type: Number,
//         required: true,
//     },
//     cpfTitular: {
//         type: String,
//         required: true,
//     },
// })
// export const ClienteModel = mongoose.model<ClientesBdModel>('Cliente', schemaCliente);
// export const ContaCorrenteModel = mongoose.model<ContaCorrentesBdModel>('ContaCorrente', schemaContaCorrente);
// app.get("/", async (req, res) => {
//     try {
//         let clienteOrigemBD = await ClienteModel.findOne({ cpf: "456" });
//         let contaOrigemBD = await ContaCorrenteModel.findOne({ cpfTitular: "456" });
//         let clienteOrigem = new Clientes(
//             (clienteOrigemBD?.nomeCompleto) ? clienteOrigemBD?.nomeCompleto : "",
//             (clienteOrigemBD?.cpf) ? clienteOrigemBD?.cpf : ""
//         );
//         let contaOrigem = new ContaCorrentes(
//             (contaOrigemBD?.numero) ? contaOrigemBD?.numero : 0,
//             (contaOrigemBD?.agencia) ? contaOrigemBD?.agencia : 0,
//             clienteOrigem,
//             (contaOrigemBD?.saldo) ? contaOrigemBD?.saldo : 0
//         );
//         let clienteDestinoBD = await ClienteModel.findOne({ cpf: "123" })
//         let contaDestinoBD = await ContaCorrenteModel.findOne({ cpfTitular: "123" })
//         let clienteDestino = new Clientes(
//             clienteDestinoBD?.nomeCompleto as string,
//             clienteDestinoBD?.cpf!
//         )
//         let contaDestino = new ContaCorrentes(
//             (contaDestinoBD?.numero) ? contaDestinoBD?.numero : 0,
//             (contaDestinoBD?.agencia) ? contaDestinoBD?.agencia : 0,
//             clienteDestino,
//             (contaDestinoBD?.saldo) ? contaDestinoBD?.saldo : 0
//         )
//         contaOrigem.transferir(contaDestino, 10)
//         contaOrigemBD!.saldo = contaOrigem.getSaldo()
//         contaDestinoBD!.saldo = contaDestino.getSaldo()
//         await contaOrigemBD?.save()
//         await contaDestinoBD?.save()
//         let resposta = { contaOrigem, contaDestino }
//         res.send(resposta)
//     }
//     catch (e) {
//         res.send("erro")
//     }
// });
// app.get("/inserirCliente", (req, res) => {
//     let conta = new ContaCorrenteModel();
//     conta.numero = 2;
//     conta.agencia = 1;
//     conta.saldo = 50;
//     conta.cpfTitular = "12397879626"
//     conta.save((err) => {
//         if (err)
//             return res.status(500).send("Erro ao cadastrar conta")
//         res.send("Conta cadastrado com sucesso");
//     })
// })
exports.app.listen(porta, function () {
    console.log("Rodando na porta " + porta);
});
module.exports = mongoose_1.default;
