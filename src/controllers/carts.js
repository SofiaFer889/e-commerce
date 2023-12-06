import { request, response } from "express"
import {getCartByIdService, createCartService, addProductInCartService} from '../service/carts.js'

export const getCartById = async(req=request, res=response) => {
    try {
        const {cid} = req.params
        const cart = await getCartByIdService(cid)
        if(cart)
           return res.json({cart})
        return res.status(404).json({msg: `el carrito con id ${cid} no existe`})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const createCart = async(req=request, res=response) => {
    try {
        const cart = await createCartService()
        return res.json({msg: 'carrito creado', cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

export const addProductInCart = async(req=request, res=response) => {
    try {
        const {cid, pid} =  req.params
        const cart = await addProductInCartService(cid, pid)
        if(!cart)
            return res.status(404).json({msg:`el carrito conid ${cid} no existe`})

        return res.json({msg:'carrito actualizado', cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}