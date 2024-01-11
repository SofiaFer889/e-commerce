import { Router } from "express"
import { getProductById, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/products.js"
import { uploader } from "../config/multer.js"
const router = Router()

router.get('/', getProducts)

router.get('/:pid', getProductById)

router.post('/',uploader.single('file'), addProduct)

router.put('/',uploader.single('file'), updateProduct)

router.delete('/', deleteProduct)

export default router