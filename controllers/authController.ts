import { NextFunction, Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import { Decoded } from "../src/types/decoded";
import { User } from "../models/Users";

dotenv.config({ path: ".env" });

// export const userMe = async (req: Request, res: Response) => {
//   res.send(req.user);
// };
 
export const protectRouters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = ''

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    const secret = process.env.SECRET as string
    const decoded = jwt.verify(token, secret)

    const user = await User.findOne({where: { id: (<Decoded>decoded).user.id }})

    if(!user){
      return res.status(404).json({
        message: 'User not found'
      })
    }

    next()

  } catch (error) {
    res.status(400).json(reportError({message: getErrorMessage(error)}))
  }
}