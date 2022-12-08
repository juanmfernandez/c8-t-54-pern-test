import { Categories } from "../models/Categories";
import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";

export const list = async (req: Request, res: Response) => {
    try {
        const allCategories = await Categories.findAll();
        res.status(200).json({ allCategories })
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};

export const saveCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.body;

        const newCategory = await Categories.create({
            categoryName: categoryName,

        })
        res.status(201).json({ message: "Category added succesfully", newCategory })

    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};

export const update = async (req: Request, res: Response) => {
    const categoryId = req.params.id;

    try {
        const categoryToUpdate = await Categories.findByPk(categoryId);

        if (!categoryToUpdate) return res.status(401).json({ message: "Color not found, or doest exist" })

        await categoryToUpdate.update({
            categoryName: req.body.categoryName,
        });
        res.status(200).json({ categoryUpdated: categoryToUpdate })

    } catch (error) {
        res.status(400).json({ errorMessage: `Invalid uuid: ${categoryId}` })
    }
};

export const deleteColour = async (req: Request, res: Response) => {
    res.send('controller no disponible :P')
};