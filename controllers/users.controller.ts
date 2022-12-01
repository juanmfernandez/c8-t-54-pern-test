const { User } = require("../models/Users");
const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import { Cart } from "../models/Carts";

const hashPassword = async (password: string, saltRound: number) => {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            where: { email: email },
            attributes: { exclude: ["password"] },
            include: Cart
        });
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await hashPassword(password, 10)
        const [user, created] = await User.findOrCreate({
            where: email ? { email: email} : { userName: userName},
            defaults: {
                userName: userName,
                email: email,
                password: hashedPassword,
            }
        })

        if (!created) {
            let msg = email ? `E-mail ${email}` : `Username ${userName}`
            throw new Error(`${msg} already exists in database`)
        }
        await delete user.dataValues.password;
        const cart = await Cart.create({ status:"activo", totalPrice:0 });
        await Cart.update({userId: user.dataValues.id},{where: {
            id: cart.dataValues.id
        }})
        await User.update({cartId: cart.dataValues.id},{where: {
            id: user.dataValues.id
        }})

        res.status(200).json({ success: `User added with e-mail ${req.body.email}`, user: user.dataValues })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password }: any = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "User or password is not correct",
            });
        }

        await delete user.dataValues.password;

        const secret = process.env.SECRET as string

        const token = jwt.sign({ user: user.dataValues }, secret, { expiresIn: "2h" });

        return res.status(200).json({
            message: "User access successfully",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phoneNumber, userRole, profilePic } = req.body;
        console.log(req.params.id);
        
        const dataToUpdate = {
            firstName,
            lastName,
            phoneNumber,
            userRole,
            profilePic
        }

        const userExists = await User.findOne({
            where: { email },
        });

        if (userExists === null) {
            throw new Error(`E-mail ${req.body.email} not found in database`)
        }

        const userUpdated = await User.update(dataToUpdate, {
            where: { email },
        });

        if (!userUpdated) {
            throw new Error(`E-mail ${req.body.email} not found in database`)
        }

        res.status(200).json({ success: `User ${req.body.email} updated succesfull `, params: dataToUpdate })

    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
}

