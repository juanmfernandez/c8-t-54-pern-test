import { Router } from "express";
import { addToCart, createCart, getCart, remToCart } from "../controllers/productsInCart";

const prodInCart = Router();

prodInCart.get("/", getCart);
prodInCart.post("/add", addToCart);
prodInCart.post("/remove", remToCart);
prodInCart.post("/addCart", createCart);
export default prodInCart;
