import { Colour } from "../models/Colours";
import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";

//
export const list = async (req: Request, res: Response) => {
    try {
        const allColours = await Colour.findAll();
        res.status(200).json({ allColours })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};

//
export const saveColour = async (req: Request, res: Response) => {
    try {
        const { colourName, colourValue } = req.body;
        console.log(colourName, colourValue);

        const newColour = await Colour.create({
            colourName: colourName,
            colourValue: colourValue
        })
        res.status(201).json({ message: "Colour added succesfully", newColour })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};




//
export const update = async (req: Request, res: Response) => {
    const colourId = req.params.id;

    try {
        const colourToUpdate = await Colour.findByPk(colourId, {});

        if (!colourToUpdate) return res.status(401).json({ message: "Color not found, or doest exist" })

        await colourToUpdate.update({
            colourName: req.body.colourName,
            colourValue: req.body.colourValue
        });
        res.status(200).json({ colourToUpdate })

    } catch (error) {
        res.status(400).json({ errorMessage: `Invalid uuid: ${colourId}` })
    }
};

//
export const deleteColour = async (req: Request, res: Response) => {
};