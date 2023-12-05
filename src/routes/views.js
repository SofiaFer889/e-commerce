import { Router } from "express"
import ProductManager from "../productManager.js"

const router = Router()

router.get('/', (req, res)=>{
    const p = new ProductManager()
    const products = p.getProducts()
    return res.render('home', {products})
})

export default router