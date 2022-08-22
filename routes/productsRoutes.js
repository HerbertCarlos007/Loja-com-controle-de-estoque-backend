const router = require('express').Router()
const Products = require('../models/Products')


router.post('/', async (req,res) => {
    const {name, description, amount, brand, purchasePrice, saleValue} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigátorio'})
        return
    }

    const product = {
        name,
        description,
        amount,
        brand,
        purchasePrice,
        saleValue
    }

    try {
        await Products.create(product)
        res.status(201).json({message: 'Producto cadastrado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Products.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const products = await Products.findOne({_id: id})

        if(!products) {
            res.status(422).json({message: 'Produto não encontrado!'})
            return
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, description, amount, brand, purchasePrice, saleValue} = req.body

    const products = {
        name,
        description,
        amount,
        brand,
        purchasePrice,
        saleValue
    }
    
    try {
        const updateProduct = await Products.updateOne({_id: id}, products)

        if(updateProduct.matchedCount === 0) {
            res.status(422).json({message: 'O produto não foi encontrado'})
            return
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    
    const products = await Products.findOne({_id: id})
    if(!products){
        res.status(422).json({message: 'Produto não encontrado!'})
        return
    }

    try {
        await Products.deleteOne({_id: id})
        res.status(200).json({message: 'Produto deletado com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})



module.exports = router