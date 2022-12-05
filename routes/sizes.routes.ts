import { Router } from "express";
import { list, sizeDetail, createSize, updateSize, deleteSize } from "../controllers/sizes.controller";

const route = Router();

route.get('/', list);
route.get('/:id', sizeDetail);
route.post('/', createSize);
route.put('/:id', updateSize);
route.delete('/:id', deleteSize);

export { route as sizesRouter };