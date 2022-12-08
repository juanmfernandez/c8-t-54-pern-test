import mercadopago from 'mercadopago' ;
import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { UserDataInterface } from '../interfaces/user.interface';

const clientSecret = process.env.CLIENT_SECRET;
const clientId= process.env.CLIENT_ID;

export const mp = async (items: Array<Object>, user: UserDataInterface, req: Request) => {
    console.log("file.req ", req.headers);
    const server = req.headers.origin || 'http://localhost:3000' || "https://c854pernfront-5m8om.ondigitalocean.app";
    const success = `${server}/checkout/success`;
    const failure = `${server}/checkout/failure`;
    const pending = `${server}/checkout/pending`;
    try{

        if(clientSecret && clientId){
            mercadopago.configure({
                client_id: clientId,
                client_secret: clientSecret,
            });
        }

        const preferenceConfig: CreatePreferencePayload = {
            items: items,
            back_urls: {success,failure,pending},
            payer: {
                name: user.firstName,
                surname: user.lastName,
                email: user.email,
            }
        }

    const preference = mercadopago.preferences.create(preferenceConfig)
    
    return preference

    } catch (error) {
         console.log(reportError({ message: getErrorMessage(error) }))
    }
}

