import { Router } from "express"
import { getProductsService } from "../service/products.js"
import {getCartByIdService} from '../service/carts.js'
const router = Router()

router.get('/', async (req, res)=>{
    const {payload} = await getProductsService({})
    return res.render('home', {products: payload, styles: 'styles.css', title:'Home'})
})

router.get('/realtimeproducts', (req, res)=>{
    return res.render('realTimeProducts', {title:'Real Time'})
})

router.get('/chat', (req, res)=>{
    return res.render('chat', {styles: 'chat.css', title:'Chat'})
})

router.get('/products', async (req, res)=>{
    const result = await getProductsService(...req.query)
    return res.render('products', {title:'productos', result, styles:'products.css'})
})

router.get('/cart/:cid', async (req, res)=>{
    const {cid} = req.params
    const cart = await getCartByIdService(cid)
   return res.render('cart', {title:'carrito', styles:'cart.css', cart})
})

export default router