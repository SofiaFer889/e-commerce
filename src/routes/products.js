import { Router } from "express"
import { mockingProducts, getProductById, getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/products.js"
import { uploader } from "../config/multer.js"
import { isAdmin, validarCampos, validarJWT } from "../middlewere/auth.js"
import { check } from "express-validator"
import { existeCode, existeProduct } from "../helpers/db-validaciones.js"
import logger from "../utils/logger.js"

const router = Router()
router.get('mockingproducts', (req, res) => {
    logger.info('Obteniendo productos simulados')
    mockingProducts(req, res)
})

router.get('/', validarJWT, (req, res) => {
    logger.info('Obteniendo todos los productos')
    getProducts(req, res)
})

router.get('/:pid', [
    validarJWT,
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], (req, res) => {
    logger.info(`Obteniendo producto con ID: ${req.params.pid}`)
    getProductById(req, res)
})

router.post('/',[
    validarJWT,
    isAdmin,
    check('title','el titulo es obligatorio').not().isEmpty(),
    check('description','la descripcion es obligatorio').not().isEmpty(),
    check('code','el code es obligatorio').not().isEmpty(),
    check('code').custom(existeCode),
    check('price','el price es obligatorio y de tipo numerico').not().isEmpty().isNumeric(),
    check('stock','el stock es obligatorio y de tipo numerico').not().isEmpty().isNumeric(),
    check('category','la category es obligatorio').not().isEmpty(),
    validarCampos,
    uploader.single('file')
], (req, res) => {
    logger.info('Añadiendo nuevo producto')
    addProduct(req, res)
})

router.put('/:pid',[
    validarJWT,
    isAdmin,
    check('pid', 'el no es valido el id del producto').isMongoId(),
    check('pid').custom(existeProduct),
    validarCampos,
    uploader.single('file')
], (req, res) => {
    logger.info(`Actualizando producto con ID: ${req.params.pid}`)
    updateProduct(req, res)
})

router.delete('/:pid', [
    validarJWT,
    isAdmin,
    check('pid', 'no es valid el id de producto').isMongoId(),
    check('pid').custom.apply(existeProduct),
    validarCampos,
], (req, res) => {
    logger.info(`Eliminando producto con ID: ${req.params.pid}`)
    deleteProduct(req, res)
})

export {router as productsRouter}