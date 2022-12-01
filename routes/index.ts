import { Router } from "express"
import { Response, Request } from "express";
import productRouter from "./products";
import prodInCart from "./productsInCart";
import userRouter from "./users.routes";
const router = Router()

router.use("/users", userRouter);
router.use('/products', productRouter);
router.use('/cart', prodInCart)
router.get("/", (_req: Request, res: Response) => res.send("OK"));

export default router;