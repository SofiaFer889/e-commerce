import { Router } from "express"
import { createUser, loginUser } from "../controllers/auth.js"
import { check } from "express-validator"
import { validarCampos } from "../middlewere/auth.js"
import { existeEmail } from "../helpers/db-validaciones.js"
import logger from "../utils/logger.js"

const  router = Router()
router.post('/login',[
    check('email', 'el email es obligatorio y debe ser valido').isEmail(),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    validarCampos,
], (req, res) =>{
    logger.info(`Inicio de sesión exitoso para el usuario con email: ${req.body.email}`)
    loginUser(req, res)
})
router.post('/register',[
    check('email', 'el email es obligatorio y debe ser valido').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    check('name', 'el name es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    logger.info(`Registro exitoso para el usuario con email: ${req.body.email}`)
    createUser(req, res)
})

export {router as authRouter}