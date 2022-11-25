const { Product } = require("../models/Products");
const { User } = require("../models/Users");
const { Cart } = require("../models/Carts");
import { Request, Response } from "express";

export const test = async (req: Request, res: Response) => {
  res.status(200).json({ Funciona: "Si funciona" });
};

export const addToCart = async (req: Request, res: Response) => {
  //* Requiere id del carrito y el id del producto (llegan desde query params)
  const { idProduct, idCart } = req.query;
  try {
    const product = await Product.findByPk(idProduct);
    const cart = await Cart.findByPk(idCart);
    cart.increment({ totalPrice: product.price });
    const productAdd = cart.addProducts(product);
    res.status(200).json(productAdd);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const remToCart = async (req: Request, res: Response) => {
  //* Requiere id del carrito y el id del producto (llegan desde query params)
  const { idProduct, idCart } = req.query;
  try {
    const product = await Product.findByPk(idProduct);
    const cart = await Cart.findByPk(idCart);
    cart.decrement({ totalPrice: product.price });
    const productRemove = cart.removeProducts(product);
    res.status(200).json(productRemove);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const createCart = async (req: Request, res: Response) => {
  const { status, totalPrice } = req.body;
  try {
    const cart = await Cart.create({ status, totalPrice });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getCart = async (req: Request, res: Response) => {
  const { idCart } = req.query;
  try {
    const cart = await Cart.findByPk(idCart, { include: Product });
    res.status(200).json(cart);
  } catch (error) {}
};
