import { request, response } from "express"
import {cartModel} from "../dao/models/cartsModel.js"

export const getCartById = async(req=request, res=response) => {
    try {
        const {cid} = req.params
        const cart = await cartModel.findById(cid)
        if(cart)
           return res.json({cart})
        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
    } catch (error) {
        console.log('getCartById ->', error)
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const createCart = async(req=request, res=response) => {
    try {
        const cart = await cartModel.create({})
        return res.json({msg: 'carrito creado', cart})
    } catch (error) {
        console.log('createCart ->', error)
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const addProductInCart = async(req=request, res=response) => {
    try {
        const {cid, pid} =  req.params
        const cart = await cartModel.findById(cid)
        if(!cart)
            return res.status(404).json({msg:`el carrito conid ${cid} no existe`})
        const productInCart = cart.products.find(p=>p.id.toString() === pid)
        if (productInCart)
           productInCart.quantity++
        else
           cart.products.push({id:pid, quantity: 1})

        cart.save()

        return res.json({msg:'carrito actualizado', cart})
    } catch (error) {
        console.log('addProductInCart ->', error)
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}