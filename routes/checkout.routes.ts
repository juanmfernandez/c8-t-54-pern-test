import { Router } from "express";
import { failure, pending, process, success } from "../controllers/checkout.controller";
const router = Router();

//router.post('/process',process); RUTA REAL
router.get('/process',process);// RUTA SIN FORM 

router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);

export {router as checkoutRouter};