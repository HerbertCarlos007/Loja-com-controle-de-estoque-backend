import { Request, Response } from "express";
import { Products } from "../models/Products";

class ProductsController {
    async findAll(req:Request, res:Response) {
        const products = await Products.findAll()
        return products.length > 0? res.status(200).json(products) : 
        res.status(204).send()
    }

    async findOne(req:Request, res:Response) {
       const { id } = req.params
       const product = await Products.findOne({
        where: {
            id: id
        }
       })
       return product ? res.status(200).json(product) :
       res.status(204).send()
    }

    async create(req:Request, res:Response) {
        const { name, description, amount, brand, purchasePrice, saleValue } = req.body
        const products = await Products.create({
            name,
            description,
            amount,
            brand,
            purchasePrice,
            saleValue
        })
        return res.status(201).json(products)
    }
    
    async update(req:Request, res:Response) {
        const { id } = req.params
        await Products.update(req.body, {
            where: {
                id: id
            }
        })
        return res.status(204).send()
    }

    async delete(req:Request, res:Response) {
        const { id } = req.params
        await Products.destroy({
            where: {
                id: id
            }
        })
        return res.status(204).send()
    }
}

export default new ProductsController();