import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import { mp } from "../mercadopago/mp";
import { ProductDataInterface } from "../interfaces/product.interface";
import { UserDataInterface } from "../interfaces/user.interface";
//
export const process = async (req: Request, res: Response) => {
        try {
           //let items = req.body.products.map((item: ProductDataInterface) => Object({...item, currency_id: "ARS", unit_price: item.price}))
            const itemsPrueba =[ {
                price: 10,
                id: "aade8b1e-efb8-43e7-a6f9-47669d019d93",
                productName: "camperanegra",
                description: "description false ",
                quantity: 1,
                unit_price: 10
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

            let link = await mp(itemsPrueba, userPrueba);
            
            //let link = await mp(items, req.body.user);

            return res.redirect(link?.body.init_point);
        
        } catch (error) {
            console.log(error)
            return res.send(error)
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