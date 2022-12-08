import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import { mp } from "../mercadopago/mp";
import { ProductDataInterface } from "../interfaces/product.interface";
import { UserDataInterface } from "../interfaces/user.interface";
//
export const process = async (req: Request, res: Response) => {
        try {
                if (!req.query.price) {
                        throw new Error("Please provide an amount to pay")
                }
                const totalPrice = Number(req.query.price)
                const itemsPrueba = [{
                        price: totalPrice,
                        id: req.query.cart_id || "aade8b1e-efb8-43e7-a6f9-47669d019d93",
                        productName: "Cart MovEmment",
                        description: "Cart MovEmment products",
                        quantity: 1,
                        unit_price: totalPrice,
                }];
                const userPrueba: UserDataInterface = {
                        userId: "c61c99a3-611c-427e-bf4e-0843d131379d",
                        firstName: "UserPrueba 1",
                        lastName: "UserPrueba lastName",
                        email: "emailPrueba@gmail.com",
                        userName: "",
                        password: "",
                        phoneNumber: 0,
                        userRole: "",
                        profilePic: "",
                        createdAt: "",
                        updatedAt: "",
                        deletedAt: undefined
                }

                let link = await mp(itemsPrueba, userPrueba, req);
                //let link = await mp(items, req.body.user);
                //return res.redirect(link?.body.init_point);
                res.status(201).json({ "link": link?.body.init_point })

        } catch (error) {
                res.status(400).json(reportError({ message: getErrorMessage(error) }))
        }
};

//
export const success = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
};

//
export const failure = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
};

//
export const pending = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
};