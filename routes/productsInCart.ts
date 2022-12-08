import { Router } from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  remToCart,
} from "../controllers/productsInCart";

const prodInCart = Router();

prodInCart.get("/", getCart);
prodInCart.post("/add", addToCart);
prodInCart.post("/remove", remToCart);
prodInCart.delete("/delete", deleteCart);
export default prodInCart;
