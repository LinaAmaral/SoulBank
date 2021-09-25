"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaCorrenteModel = exports.ClienteModel = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var Clientes_1 = require("./Clientes");
var ContaCorrentes_1 = require("./ContaCorrentes");
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
var schemaCliente = new mongoose_1.default.Schema({
    nomeCompleto: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
    }
});
var schemaContaCorrente = new mongoose_1.default.Schema({
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
});
exports.ClienteModel = mongoose_1.default.model('Cliente', schemaCliente);
exports.ContaCorrenteModel = mongoose_1.default.model('ContaCorrente', schemaContaCorrente);
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clienteOrigemBD, contaOrigemBD, clienteOrigem, contaOrigem, clienteDestinoBD, contaDestinoBD, clienteDestino, contaDestino, resposta, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, exports.ClienteModel.findOne({ cpf: "456" })];
            case 1:
                clienteOrigemBD = _a.sent();
                return [4 /*yield*/, exports.ContaCorrenteModel.findOne({ cpfTitular: "456" })];
            case 2:
                contaOrigemBD = _a.sent();
                clienteOrigem = new Clientes_1.Clientes((clienteOrigemBD === null || clienteOrigemBD === void 0 ? void 0 : clienteOrigemBD.nomeCompleto) ? clienteOrigemBD === null || clienteOrigemBD === void 0 ? void 0 : clienteOrigemBD.nomeCompleto : "", (clienteOrigemBD === null || clienteOrigemBD === void 0 ? void 0 : clienteOrigemBD.cpf) ? clienteOrigemBD === null || clienteOrigemBD === void 0 ? void 0 : clienteOrigemBD.cpf : "");
                contaOrigem = new ContaCorrentes_1.ContaCorrentes((contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.numero) ? contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.numero : 0, (contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.agencia) ? contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.agencia : 0, clienteOrigem, (contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.saldo) ? contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.saldo : 0);
                return [4 /*yield*/, exports.ClienteModel.findOne({ cpf: "123" })];
            case 3:
                clienteDestinoBD = _a.sent();
                return [4 /*yield*/, exports.ContaCorrenteModel.findOne({ cpfTitular: "123" })];
            case 4:
                contaDestinoBD = _a.sent();
                clienteDestino = new Clientes_1.Clientes(clienteDestinoBD === null || clienteDestinoBD === void 0 ? void 0 : clienteDestinoBD.nomeCompleto, clienteDestinoBD === null || clienteDestinoBD === void 0 ? void 0 : clienteDestinoBD.cpf);
                contaDestino = new ContaCorrentes_1.ContaCorrentes((contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.numero) ? contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.numero : 0, (contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.agencia) ? contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.agencia : 0, clienteDestino, (contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.saldo) ? contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.saldo : 0);
                contaOrigem.transferir(contaDestino, 10);
                contaOrigemBD.saldo = contaOrigem.getSaldo();
                contaDestinoBD.saldo = contaDestino.getSaldo();
                return [4 /*yield*/, (contaOrigemBD === null || contaOrigemBD === void 0 ? void 0 : contaOrigemBD.save())];
            case 5:
                _a.sent();
                return [4 /*yield*/, (contaDestinoBD === null || contaDestinoBD === void 0 ? void 0 : contaDestinoBD.save())];
            case 6:
                _a.sent();
                resposta = { contaOrigem: contaOrigem, contaDestino: contaDestino };
                res.send(resposta);
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                res.send("erro");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.get("/inserirCliente", function (req, res) {
    var conta = new exports.ContaCorrenteModel();
    conta.numero = 2;
    conta.agencia = 1;
    conta.saldo = 50;
    conta.cpfTitular = "12397879626";
    conta.save(function (err) {
        if (err)
            return res.status(500).send("Erro ao cadastrar conta");
        res.send("Conta cadastrado com sucesso");
    });
});
app.listen(porta, function () {
    console.log("Rodando na porta " + porta);
});
