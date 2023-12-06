import { cartModel } from "../dao/models/cartsModel.js"

export const getCartByIdService = async(cid) => {
    try {
        return await cartModel.findById(cid)
        
    } catch (error) {
        console.log('getCartByIdService ->', error)
        throw error
    }
}

export const createCartService = async() => {
    try {
        return await cartModel.create({})
    } catch (error) {
        console.log('createCartService ->', error)
        throw error
    }
}

export const addProductInCartService = async(cid, pid) => {
    try {
        const cart = await cartModel.findById(cid)
        if(!cart)
            return null
        const productInCart = cart.products.find(p=>p.id.toString() === pid)
        if (productInCart)
           productInCart.quantity++
        else
           cart.products.push({id:pid, quantity: 1})

        cart.save()

        return cart
    } catch (error) {
        console.log('addProductInCartService ->', error)
        throw error
    }
}