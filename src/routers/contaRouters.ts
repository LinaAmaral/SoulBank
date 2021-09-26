import express from "express";
import * as controlador from "../controllers/contaController"

// const controller = controlador;
export const router = express.Router();

router.get('/', (request, response) => {
  response.render("login");
});

router.get('/transacoes', (request, response) => {
  response.render("transacoes");
});

router.get('/transferencia', (request, response) => {
  response.render("transferencia");
});

router.get('/saldo', (request, response) => {
  response.render("saldo");
});


export { router as minhaRouter }





