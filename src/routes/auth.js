import { Router } from "express"
import { createUser, loginUser } from "../controllers/auth.js"
import { check } from "express-validator"
import { validarCampos } from "../middlewere/auth.js"
import { existeEmail } from "../helpers/db-validaciones.js"

const  router = Router()
router.post('/login',[
    check('email', 'el email es obligatorio y debe ser valido').isEmail(),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    validarCampos,
], loginUser)
router.post('/register',[
    check('email', 'el email es obligatorio y debe ser valido').isEmail(),
    check('email').custom(existeEmail),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    check('name', 'el name es obligatorio').not().isEmpty(),
    validarCampos
], createUser)

export {router as authRouter}