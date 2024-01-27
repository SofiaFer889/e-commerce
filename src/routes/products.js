import { Router } from "express"
import { getProductById, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/products.js"
import { uploader } from "../config/multer.js"
import { validarJWT } from "../middlewere/auth.js"
const router = Router()

router.get('/', validarJWT, getProducts)

router.get('/:pid', validarJWT,getProductById)

router.post('/',[
    validarJWT,
    uploader.single('file')
], addProduct)

router.put('/',[
    validarJWT,
    uploader.single('file')
], updateProduct)

router.delete('/', validarJWT,deleteProduct)

export {router as productsRouter}