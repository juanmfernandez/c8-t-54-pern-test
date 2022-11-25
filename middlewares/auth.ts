const {validateToken} = require("../config/token")
import { NextFunction, Response, Request } from "express";

function validateAuth(req: Request, res: Response, next: NextFunction){
    const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

 req.user = user

  next();
}