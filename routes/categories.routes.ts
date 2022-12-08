import { Router } from "express";
import { list, saveCategory, update, deleteColour } from "../controllers/categories.controller";

const route = Router();

route.get('/', list);
route.post('/save', saveCategory);
route.put('/update/:id', update);
route.delete('/delete/:id', deleteColour);

export { route as categoryRouter };