import {request, response} from 'express'
import { getProductsService, getProductByIdService, addProductService, updateProductService, deleteProductService } from '../service/products.js'

export const getProducts = async(req=request, res=response) =>{
    try {

        const result = await getProductsService({...req.query})

        return res.json({result})
        
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const getProductById = async(req=request, res=response) =>{
    try {
        const {pid} = req.params
        const product = await getProductByIdService(pid)
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
        const {title, description, price, code, stock, category} = req.body

        if(!title, !description, !price, !code, !stock, !category)
           return res.status(404).json({msg:`los campos [title, description, price, code, stock, category] son obligatorios`})
        
        const product = await addProductService({...req.body})

        return res.json({product})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const updateProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const {_id, ...rest} = req.body
       const product = await updateProductService(pid, rest)
       if(product)
          return res.json({msg:'producto actualizado', product})
        return res.status(404).json({msg: `no se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const deleteProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const product = await deleteProductService(pid)
       if(product)
          return res.json({msg:'producto elimminido', product})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}