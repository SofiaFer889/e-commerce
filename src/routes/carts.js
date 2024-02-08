import { Router } from "express"
import {getCartById, addProductInCart, deleteProductsInCart, updateProductsInCart, finalizarCompra} from '../controllers/carts.js'
import { validarCampos, validarJWT } from "../middlewere/auth.js"
import { check } from "express-validator"
import { existeCart } from "../helpers/db-validaciones.js"
import logger from "../utils/logger.js"

const router = Router()

router.get('/:cid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    validarCampos,
], (req, res) => {
    logger.info(`Obteniendo carrito con ID: ${req.params.cid}`)
    getCartById(req, res)
})

//router.post('/', validarJWT,createCart)

router.post('/:cid/product/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], (req, res) => {
    logger.info(`Añadiendo producto con ID: ${req.params.pid} al carrito con ID: ${req.params.cid}`)
    addProductInCart(req, res)
})

router.delete('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], (req, res) => {
    logger.info(`Eliminando producto con ID: ${req.params.pid} del carrito con ID: ${req.params.cid}`)
    deleteProductsInCart(req, res)
})

router.put('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], (req, res) => {
    logger.info(`Actualizando producto con ID: ${req.params.pid} en el carrito con ID: ${req.params.cid}`)
    updateProductsInCart(req, res)
})
//router.delete('/:cid', validarJWT, deleteCart)

router.post('/:cid/purchase', [
    validarJWT,
    check('cid','No es valido el id del carrito').isMongoId(),
    check('cid').custom(existeCart),
    validarCampos,
], (req, res) => {
    logger.info(`Finalizando compra del carrito con ID: ${req.params.cid}`)
    finalizarCompra(req, res)
})
export {router as cartsRouter}