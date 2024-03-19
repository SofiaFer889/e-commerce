import { Router } from "express"
import { cambiarPassword, createUser, loginUser, resetPassword, validarTokenPassword } from "../controllers/auth.js"
import { check } from "express-validator"
import { validarCampos } from "../middlewere/auth.js"
import { existeEmail } from "../helpers/db-validaciones.js"
import logger from "../utils/logger.js"
import multer from "multer"

const  router = Router()

const upload = multer({ dest: 'uploads/' })

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

router.post('/cambiar-password', [
    check('email', 'el email es obligatorio y debe ser valido').isEmail(),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    validarCampos,
],cambiarPassword)

router.get('/reset-password',[
    check('token', 'el token es obligatorio').not().isEmpty(),
    validarCampos,
],validarTokenPassword)

router.post('/reset-password', [
    check('token', 'el token es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatorio y debe ser de al menos seis caracteres').isLength({min:6}),
    validarCampos,
], resetPassword)

router.post('/:uid/documents', upload.array('documents'), async (req, res) => {
    try {
        const userId = req.params.uid
        const documents = req.files

        const user = await userModel.findById(userId)
        if (!user) {
            logger.error('Usuario no encontrado')
            return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' })
        }

        user.documents = documents.map(doc => ({
            name: doc.originalname,
            reference: doc.path
        }))
        await user.save()

        const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta']
        const userDocuments = user.documents.map(doc => doc.name)

        if (requiredDocuments.every(doc => userDocuments.includes(doc))) {
            user.rol = 'premium'
            await user.save()
        }

        return res.json({ ok: true, msg: 'Documentos cargados exitosamente' })
    } catch (error) {
        logger.error('Error al cargar documentos:', error)
        return res.status(500).json({ ok: false, msg: 'Error interno del servidor' })
    }
})

export {router as authRouter}