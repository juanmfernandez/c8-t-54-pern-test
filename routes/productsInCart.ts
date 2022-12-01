import { Router } from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  remToCart,
} from "../controllers/productsInCart";

const prodInCart = Router();

prodInCart.get("/", getCart); //* Show cart
prodInCart.post("/add", addToCart); //* Add a product to the cart
prodInCart.post("/remove", remToCart); //* Remove a product from the cart
prodInCart.delete("/delete", deleteCart); //* Remove all products from the cart
export default prodInCart;
