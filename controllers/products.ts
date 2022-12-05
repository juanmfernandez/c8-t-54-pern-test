import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../helpers/errorReport";
const { Product, ProductImgsAssoc } = require("../models/Products");
const { User } = require("../models/Users");
const { Size } = require("../models/Sizes");
import { Categories } from "../models/Categories";
import { Colour } from "../models/Colours";

// List of every product in db
export const list = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["productName", "asc"]],
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" }
            ]
        })
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};

// brings one product based in his id/UUID
export const productDetail = async (req: Request, res: Response) => {
    try {
        const idP = req.params.id;
        const product = await Product.findOne({
            where: { id: idP },
            include: [
                { association: "ProductImgs" },
                { association: "Size" },
                { association: "Categories" },
                { association: "Colours" }
            ]
        });
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};

// Stores the product in the db
export const saveProduct = async (req: Request, res: Response) => {
    try {
        const { productName, description, quantityInStock, price, pics, sizes, categoriesIds, colours } = req.body;
        let picsUrls: Array<any> = []
        pics.forEach((url: any) => {
            picsUrls.push({ status: "active", imgUrl: url })
        });
        const newProduct = await Product.create({
            productName,
            description,
            quantityInStock,
            price,
            ProductImgs: picsUrls
        }, {
            include: [{
                association: ProductImgsAssoc,
                as: "ProductImgs",
            }]
        });

        const size = await Size.findAll({
            where: {
                id: sizes
            }
        });
        const categories = await Categories.findAll({
            where: {
                id: categoriesIds
            }
        });
        const coloursResult = await Colour.findAll({
            where: {
                id: colours
            }
        });

        const prodSized = await newProduct.addSize(size)

        const prodCat = await newProduct.addCategories(categories)

        const prodCol = await newProduct.addColours(coloursResult)

        res.status(201).json({ message: "New Product created", newProduct, prodSized, prodCat, prodCol })

    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    };
};

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const productToUpdate = await Product.findByPk(productId, {});

        if (productToUpdate !== null) {
            await productToUpdate.update({
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                quantityInStock: req.body.quantityInStock
            });
            return res.status(200).json(productToUpdate)
        }

    } catch (error) {
        res.status(400).json({ errorMessage: "Product could't be saved" })
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    
    const id = req.params.id;

    try {

        const prodToDelete = await Product.destroy({
            where: { id: id }
        });

        if (prodToDelete === 0) {
            throw new Error(`Product ID ${id} not found in database`)
        }

        return res.status(200).json({success: `Product ID ${id} just deleted successfully`})

    } catch (error) {
        res.status(400).json(reportError({ message: getErrorMessage(error) }))
    }
};