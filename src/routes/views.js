import { Router } from "express"
import {productModel} from "../dao/models/productsModel.js"

const router = Router()

router.get('/', async (req, res)=>{
    const products = await productModel.find().lean()
    return res.render('home', {products, styles: 'styles.css', title:'Home'})
})

router.get('/realtimeproducts', (req, res)=>{
    return res.render('realTimeProducts', {title:'Real Time'})
})

router.get('/chat', (req, res)=>{
    return res.render('chat', {styles: 'chat.css', title:'Chat'})
})

export default router