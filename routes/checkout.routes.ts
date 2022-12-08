import { Router } from "express";
import { failure, pending, process, success } from "../controllers/checkout.controller";
const router = Router();

router.get('/process', process);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);

export { router as checkoutRouter };