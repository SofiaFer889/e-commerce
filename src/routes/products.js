import { Router } from "express"
import { getProductById, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/products.js"

const router = Router()

router.get('/', getProducts)

router.get('/:pid', getProductById)

router.post('/', addProduct)

router.put('/', updateProduct)

router.delete('/', deleteProduct)

export default router