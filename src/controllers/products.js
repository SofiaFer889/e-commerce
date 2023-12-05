import {request, response} from 'express'
import {productModel} from '../dao/models/productsModel.js'

export const getProducts = async(req=request, res=response) =>{
    try {
        const {limit} = req.query
        const [products, total] = await Promise.all([productModel.find().limit(Number(limit)),productModel.countDocuments])
        return res.json({total, products})
    } catch (error) {
        console.log('getProducts ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const getProductById = async(req=request, res=response) =>{
    try {
        const {pid} = req.params
        const product = await productModel.findById(pid)
        if(!product)
           return res.status(404).json({msg:`el producto con id ${pid} no existe`})
        return res.json({product})
    } catch (error) {
        console.log('getProductById ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const addProduct = async(req=request, res=response) =>{
    try {
        const {title, description, price, thumbnails, code, stock, category, status} = req.body

        if(!title, !description, !price, !code, !stock, !category)
           return res.status(404).json({msg:`los campos [title, description, price, code, stock, category] son obligatorios`})
        
        const product = await productModel.create({title, description, price, thumbnails, code, stock, category, status})

        return res.json({product})
    } catch (error) {
        console.log('addProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const updateProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const {_id, ...rest} = req.body
       const product = await productModel.findByIdAndUpdate(pid, {...rest}, {new: true})
       if(product)
          return res.json({msg:'producto actualizado', product})
        return res.status(404).json({msg: `no se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        console.log('updateProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const deleteProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const product = await productModel.findByIdAndDelete(pid)
       if(product)
          return res.json({msg:'producto elimminido', product})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}