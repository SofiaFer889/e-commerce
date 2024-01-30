import { cartModel } from "./models/cartsModel.js"

export const getCartById = async (cid) => await cartModel.findById(cid).populate('products.id',['title', 'price', 'stock'])

export const createCart = async () => await cartModel.create({})

export const addProductInCart = async (cid, pid) => {

    const cart = await cartModel.findById(cid)
    if (!cart)
        return null
    const productInCart = cart.products.find(p => p.id.toString() === pid)
    if (productInCart)
        productInCart.quantity++
    else
        cart.products.push({ id: pid, quantity: 1 })

    cart.save()

    return cart
}

export const deleteProductsInCart = async (cid, pid) =>
    await cartModel.findByIdAndDelete(cid, { $pull: { 'products': { id: pid } } }, { new: true })

export const updateProductsInCart = async (cid, pid, quantity) =>
    await cartModel.findOneAndUpdate(
        { _id: cid, 'products.id': pid },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
    )

export const deleteCart = async (cid) => await cartModel.findByIdAndDelete(cid)