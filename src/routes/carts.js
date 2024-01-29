import { Router } from "express"
import {getCartById, addProductInCart, deleteProductsInCart, updateProductsInCart} from '../controllers/carts.js'
import { validarCampos, validarJWT } from "../middlewere/auth.js"
import { check } from "express-validator"

const router = Router()

router.get('/:cid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    validarCampos,
],getCartById)

//router.post('/', validarJWT,createCart)

router.post('/:cid/product/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
],addProductInCart)

router.delete('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], deleteProductsInCart)

router.put('/:cid/products/:pid', [
    validarJWT,
    check('cid', 'el no es valido el id del carrito').isMongoId(),
    check('pid', 'el no es valido el id del producto').isMongoId(),
    validarCampos,
], updateProductsInCart)

//router.delete('/:cid', validarJWT, deleteCart)
export {router as cartsRouter}