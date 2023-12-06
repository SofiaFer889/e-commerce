import { cartModel } from "../dao/models/cartsModel.js"

export const getCartByIdService = async(cid) => {
    try {
        return await cartModel.findById(cid).populate('products.id').lean()
        
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

export const deleteProductsInCartService = async(cid,pid)=>{
    try {
        return await cartModel.findByIdAndDelete(cid,{$pull:{'products':{id:pid}}}, {new:true})
    } catch (error) {
        console.log('deleteProductsInCartService ->', error)
        throw error
    }
}

export const updateProductsInCartService = async(cid,pid, quantity)=>{
    try {
        return await cartModel.findOneAndUpdate(
            {_id:cid, 'products.id':pid},
            {$set: {'products.$.quantity':quantity}},
            {new: true}
        )
    } catch (error) {
        console.log('updateProductsInCartService ->', error)
        throw error
    }
}

export const deleteCartService = async(cid)=>{
    try {
        return await cartModel.findByIdAndDelete(cid)
    } catch (error) {
        console.log('deleteProductsInCartService ->', error)
        throw error
    }
}