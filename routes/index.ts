import { Router } from "express"
import { Response, Request } from "express";
import { categoryRouter } from "./categories.routes";
import { checkoutRouter } from "./checkout.routes";
import { colourRouter } from "./colours.routes";
import productRouter from "./products";
import prodInCart from "./productsInCart";
import { sizesRouter } from "./sizes.routes";
import userRouter from "./users.routes";
const router = Router()

router.use('/checkout', checkoutRouter);
router.use('/categories', categoryRouter);
router.use("/users", userRouter);
router.use('/products', productRouter);
router.use('/colours', colourRouter);
router.use('/cart', prodInCart);
router.use('/sizes', sizesRouter);
router.get("/", (_req: Request, res: Response) => res.send("OK"));

export default router;