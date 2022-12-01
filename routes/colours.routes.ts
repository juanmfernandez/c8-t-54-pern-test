import { Router } from "express";
import { list, saveColour, update, deleteColour } from "../controllers/colours.controller";

const route = Router();

route.get('/', list);
route.post('/save', saveColour);
route.put('/update/:id', update);
route.delete('/delete/:id', deleteColour);

export { route as colourRouter };