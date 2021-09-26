import express from "express";
import * as controlador from "../controllers/contaController"

// const controller = controlador;
export const router = express.Router();

router.get('/ola', (request, response) => {
  response.send('Hello world!');
});

router.get('/', (request, response) => {
  response.render("login");
});


export { router as minhaRouter }





