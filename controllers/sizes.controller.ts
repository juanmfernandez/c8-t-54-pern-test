import { Product } from "../models/Products";
import { Size } from "../models/Sizes";
import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";


export const list = async (req: Request, res: Response) => {
    try {
        const sizes = await Size.findAll({
            order: [["sizeLetter", "asc"]],
        })
        res.status(200).json({ sizes });
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};

export const sizeDetail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const size = await Size.findOne({
            where: { id: id }
        });
        res.status(200).json({ size });
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};

export const createSize = async (req: Request, res: Response) => {
    try {
        const { sizeLetter, description, gender, sizeNumber } = req.body;
        const newSize = await Size.create({
            sizeLetter,
            description,
            gender,
            sizeNumber
        })
        res.status(201).json({ message: "New Size created", newSize })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};

export const updateSize = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const sizeToUpdate = await Size.findByPk(id, {});

        if (sizeToUpdate !== null) {
            await sizeToUpdate.update({
                sizeLetter: req.body.sizeLetter,
                description: req.body.description,
                gender: req.body.gender,
                sizeNumber: req.body.sizeNumber
            });
            return res.status(200).json(sizeToUpdate)
        }

    } catch (error) {
        res.status(400).json({ errorMessage: "Size could't be saved" })
    }
};

export const deleteSize = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {

        const sizeToDelete = await Size.destroy({
            where: { id: id }
        });

        if (sizeToDelete === 0) {
            throw new Error(`ID ${id} not found in database`)
        }

        return res.status(200).json({ success: `ID ${id} just deleted successfully` })

    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};