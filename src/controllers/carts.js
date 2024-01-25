import { request, response } from "express"
import { CartsRepository } from "../repositories/index.js"

export const getCartById = async(req=request, res=response) => {
    try {
        const {cid} = req.params
        const cart = await CartsRepository.getCartById(cid)
        if(cart)
           return res.json({cart})
        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const createCart = async(req=request, res=response) => {
    try {
        const cart = await CartsRepository.createCart()
        return res.json({msg: 'carrito creado', cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const addProductInCart = async(req=request, res=response) => {
    try {
        const {cid, pid} =  req.params
        const cart = await CartsRepository.addProductInCart(cid, pid)
        if(!cart)
            return res.status(404).json({msg:`el carrito conid ${cid} no existe`})

        return res.json({msg:'carrito actualizado', cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const deleteProductsInCart= async (req = request, res = response)=>{
    try {
        const {cid, pid} = req.params
        const cart = await CartsRepository.deleteProductsInCart(cid,pid)
        if(!cart)
           return res.status(404).json({msg:'no se pudo relizar la operacion'})
        return res.json({msg:'producto eliminado del carrito', cart})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con el admin'})
        
    }
}

export const updateProductsInCart= async (req = request, res = response)=>{
    try {
        const {cid, pid} = req.params
        const {quantity} = req.body

        if(!quantity || Number.isInteger(quantity))
           return res.status(404).json({msg:'quantity es obligatorio y debe ser un numero entero'})

        const cart = await CartsRepository.updateProductsInCart(cid,pid,quantity)
        if(!cart)
           return res.status(404).json({msg:'no se pudo relizar la operacion'})
        return res.json({msg:'producto actualizado', cart})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con el admin'})
        
    }
}

export const deleteCart= async (req = request, res = response)=>{
    try {
        const {cid} = req.params
        const cart = await CartsRepository.deleteCart(cid)
        if(!cart)
           return res.status(404).json({msg:'no se pudo relizar la operacion'})
        return res.json({msg:'producto eliminado del carrito', cart})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con el admin'})
        
    }
}