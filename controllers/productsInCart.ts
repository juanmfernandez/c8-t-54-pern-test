const { Product } = require("../models/Products");
const { User } = require("../models/Users");
const { Cart } = require("../models/Carts");
import { Request, Response } from "express";

//* Añadir producto al carrito
export const addToCart = async (req: Request, res: Response) => {
  //* Requiere id del carrito y el id del producto (llegan desde query params)
  const { idProduct, idCart } = req.query;
  try {
    const product = await Product.findByPk(idProduct);
    const cart = await Cart.findByPk(idCart);
    if (product.quantityInStock > 0) {
      const productAdd = cart.addProducts(product);
      cart.increment({ totalPrice: product.price });
      res.status(200).json(productAdd);
    } else {
      res
        .status(200)
        .json({ message: "No puede agregarse al carrito, no hay stock." });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//* Remover producto en particular del carrito
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

//* Traer carrito con los productos
export const getCart = async (req: Request, res: Response) => {
  const { idCart } = req.query;
  try {
    const cart = await Cart.findByPk(idCart, { include: Product });
    res.status(200).json(cart);
  } catch (error) {}
};

//* Vaciar carrito
export const deleteCart = async (req: Request, res: Response) => {
  const { idCart } = req.query;

  try {
    const cart = await Cart.findByPk(idCart, { include: Product });
    await cart.removeProducts(cart.dataValues.Products);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ messaje: error });
  }
};
