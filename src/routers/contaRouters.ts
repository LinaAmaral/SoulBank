import express from "express";
import { transferenciaGet, transferenciaPost, saldoGet, transacoesGet, loginPost, loginGet } from "../controllers/contaController"
const router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost)
router.get('/transacoes', transacoesGet);
router.get('/transferencia', transferenciaGet);
router.post('/transferencia', transferenciaPost);
router.get('/saldo', saldoGet);

export { router as minhaRouter }
