import express, { response } from "express";
export const router = express.Router();

import * as controlador from "../controllers/contaController"
// const controller = controlador;

router.get('/login', (request, response) => {
  response.render("login");
});
router.post('/login', (request,response)=>{
  
})



//rota login pegar as informações do form e procurar no bd ->model invalido/renderiza para transações


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





