import { request, response } from "express"
import { CartsRepository, ProductsRepository, TicketRepository, UsersRepository } from "../repositories/index.js"
import { v4 as uuidv4 } from "uuid"

export const getCartById = async(req=request, res=response) => {
    try {
        const {_id}= req
        const {cid} = req.params
        const usuario = await UsersRepository.getUserByID(_id)

        if(!usuario) return res.status(400).json({ok:false,msg:'usuario no existe'})

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg:'carrito no valido'})

        const cart = await CartsRepository.getCartById(cid)
        return res.json({cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
}

/*export const createCart = async(req=request, res=response) => {
    try {
        const cart = await CartsRepository.createCart()
        return res.json({msg: 'carrito creado', cart})
    } catch (error) {
        return response.status(500).json({msg: 'hablar con en administrados'})
    }
*/

export const addProductInCart = async(req=request, res=response) => {
    try {
        const {_id}= req
        const {cid, pid} =  req.params

        const usuario = await UsersRepository.getUserByID(_id)

        if(!usuario) return res.status(400).json({ok:false,msg:'usuario no existe'})

        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg:'carrito no valido'})

        const existeProducto = await ProductsRepository.getProductById(pid)
        if(!existeProducto) return res.status(400).json({ok:false, msg:'el producto no existe'})

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
        const {_id}= req
        const {cid, pid} = req.params

        const usuario = await UsersRepository.getUserByID(_id)

        if(!usuario) return res.status(400).json({ok:false,msg:'usuario no existe'})
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg:'carrito no valido'})

        const existeProducto = await ProductsRepository.getProductById(pid)
        if(!existeProducto) return res.status(400).json({ok:false, msg:'el producto no existe'})

        const cart = await CartsRepository.deleteProductsInCart(cid,pid)
        return res.json({msg:'producto eliminado del carrito', cart})
    } catch (error) {
        return res.status(500).json({msg: 'hablar con el admin'})
        
    }
}

export const updateProductsInCart= async (req = request, res = response)=>{
    try {
        const {_id}= req
        const {cid, pid} = req.params
        const {quantity} = req.body

        const usuario = await UsersRepository.getUserByID(_id)

        if(!usuario) return res.status(400).json({ok:false,msg:'usuario no existe'})
        if(!(usuario.cart_id.toString() === cid)) return res.status(400).json({ok:false, msg:'carrito no valido'})

        const existeProducto = await ProductsRepository.getProductById(pid)
        if(!existeProducto) return res.status(400).json({ok:false, msg:'el producto no existe'})


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

/*export const deleteCart= async (req = request, res = response)=>{
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
*/

export const finalizarCompra = async()=> {
    try {
        const{_id}=req
        const {cid} =req.params

        const usuario = await UsersRepository.getUserByID(_id)
        if(!(usuario.cart_id.toString()===cid)) return res.status(400).json({ok:false,msg:'carrito no valido'})

        const carrito = await CartsRepository.getCartById(cid)
        if(!(carrito.products.length > 0)) return res.status(404).json({ok:false, msg:'no se puede finalizar la compra, carrito vacio', carrito})

        const productoStockValid = carrito.products.filter(p => p.id.stock >= p.quantity)

        const actualizacionesQuantity = productoStockValid.map(p => 
            ProductsRepository.updateProduct(p.id._id, {stock: p.id.stock - p.quantity})  )
        await Promise.all(actualizacionesQuantity)

        const items = productoStockValid.map(i=>({
            title:i.id.title,
            price:i.id.price,
            quantity:i.quantity,
            total:i.id.price*i.quantity
        }))

        let amount=0
        items.forEach(element => {amount = amount + element.total})
        const purchase = usuario.email
        const code = uuidv4()
        await TicketRepository.createTicket({items, amount, purchase, code})

        return res.json({ok:true, msg:'compra generada', ticket:{items, amount, code, cliente:purchase}})
    } catch (error) {
        console.log(err)
        return res.status(500).json({msg: 'hablar con el admin'})
    }
}