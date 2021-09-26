"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuario = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var contaRouters_1 = require("./routers/contaRouters");
var path_1 = __importDefault(require("path"));
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
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb+srv://lina_amaral:lina_amaral@cluster0.jklru.mongodb.net/banco?retryWrites=true&w=majority").then(function () {
    console.log("Banco conectado");
}).catch(function (error) {
    console.log("Erro ao conectar ao banco" + error);
});
exports.app.use("/", rota);
exports.usuario = { cpf: "" };
exports.app.listen(porta, function () {
    console.log("Rodando na porta " + porta);
});
module.exports = mongoose_1.default;
