import { Router } from "express"
import { getProductById, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/products.js"
import { uploader } from "../config/multer.js"
import { isAdmin, validarCampos, validarJWT } from "../middlewere/auth.js"
import { check } from "express-validator"
import { existeCode, existeProduct } from "../helpers/db-validaciones.js"

const router = Router()

router.get('/', validarJWT, getProducts)

router.get('/:pid', [
    validarJWT,
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
],getProductById)

router.post('/',[
    validarJWT,
    isAdmin,
    check('title','el titulo es obligatorio').not().isEmpty(),
    check('description','la descripcion es obligatorio').not().isEmpty(),
    check('code','el code es obligatorio').not().isEmpty(),
    check('code').custom(existeCode),
    check('price','el price es obligatorio y de tipo numerico').not().isEmpty().isNumeric(),
    check('stock','el stock es obligatorio y de tipo numerico').not().isEmpty().isNumeric(,
    check('category','la category es obligatorio').not().isEmpty(),
    validarCampos,
    uploader.single('file')
], addProduct)

router.put('/:pid',[
    validarJWT,
    isAdmin,
    check('pid', 'el no es valido el id del producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos,
    uploader.single('file')
], updateProduct)

router.delete('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'no es valid el id de producto').isMongoId(),
    check('pid').custom.apply(existeProduct),
    validarCampos,
],deleteProduct)

export {router as productsRouter}