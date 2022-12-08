const { Product } = require("../models/Products");
const { User } = require("../models/Users");
const { Cart } = require("../models/Carts");
import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import { Colour } from "../models/Colours";

//* Añadir producto al carrito
export const addToCart = async (req: Request, res: Response) => {
  //* Requiere id del carrito y el id del producto (llegan desde query params)
  const { idProduct, idCart } = req.query;
  try {
    const product = await Product.findByPk(idProduct);
    const cart = await Cart.findByPk(idCart);
    console.log("before",cart.dataValues.totalPrice);
    if (product.quantityInStock > 0) {
      const productAdd = await cart.addProducts(product);
      await cart.increment({ totalPrice: product.price });

      console.log("after",cart.dataValues.totalPrice);
      
      res.status(200).json(productAdd);
    } else {
      res
        .status(200)
        .json({ message: "No puede agregarse al carrito, no hay stock." });
    }
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

//* Remover producto en particular del carrito
export const remToCart = async (req: Request, res: Response) => {
  //* Requiere id del carrito y el id del producto (llegan desde query params)
  const { idProduct, idCart } = req.query;
  try {
    const product = await Product.findByPk(idProduct);
    const cart = await Cart.findByPk(idCart);
    console.log("before",cart.dataValues.totalPrice);
    await cart.decrement({ totalPrice: product.price });
    const productRemove = await cart.removeProducts(product);
    console.log("after",cart.dataValues.totalPrice);
    res.status(200).json(productRemove);
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

//* Traer carrito con los productos
export const getCart = async (req: Request, res: Response) => {
  const { idCart } = req.query;
  try {
    const cart = await Cart.findByPk(idCart, {
      include: [
        {
          model: Product,
          include: ["ProductImgs", Colour, "Size"],
        },
      ],
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

//* Vaciar carrito
export const deleteCart = async (req: Request, res: Response) => {
  const { idCart } = req.query;

  try {
    const cart = await Cart.findByPk(idCart, { include: Product });
    await cart.removeProducts(cart.dataValues.Products);
    await Cart.update({ totalPrice: 0 }, { where: { id: idCart } });
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};
