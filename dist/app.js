"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
var porta = 3000;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(function () {
    console.log("Banco conectado");
}).catch(function (error) {
    console.log("Erro ao conectar ao banco" + error);
});
var usuario = new mongoose_1.default.Schema({
    nomeCompleto: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    },
    agencia: {
        type: Number,
        required: true,
    },
    contaCorrente: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    }
});
exports.UserModel = mongoose_1.default.model('Cliente', usuario);
app.get("/", function (req, res) {
    res.send("Página inicial");
});
app.listen(porta, function () {
    console.log("Rodando na porta " + porta);
});
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
