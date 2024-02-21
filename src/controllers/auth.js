import { response, request } from "express"
import { CartsRepository, UsersRepository } from "../repositories/index.js"
import {createHash, isValidPassword} from '../utils/bcryptPassword.js'
import { genereteToken } from "../utils/jsonWebToken.js"
import logger from '../utils/logger.js'
import { sendEmail } from "../helpers/send-email.js"
import jwt from "jsonwebtoken"

export const loginUser = async(req=request, res=response) => {
    try {
        const {email, password} = req.body
        const usuario = await UsersRepository.getUserEmail(email)
        if(!usuario) return res.status(400).json({ok:false, msg:'datos incorrectos'})
        
        const validPassword = isValidPassword(password, usuario.password)
        if(!validPassword) return res.status(400).json({ok:false, msg:'datos incorrectos'})
        
        const token = genereteToken({_id, name, lastName, email, rol})
        const {_id, name, lastName, rol} = usuario

        logger.info('user autenticado correctamente')

        return res.json({ok:true, token, usuario})
    } catch (error) {
        logger.error('error al autenticar el  usuario', error)
        return res.status(500).json({ok:false, msg:'contactar con un administrador'})
    }
}
export const createUser = async(req=request, res=response) => {
    try {
        req.body.password = createHash(req.body.password)
        const carrito = await CartsRepository.createCart()
        if(!carrito) return res.status(500).json({ok:false,msg:'no se puede crear carrito'})
        req.body.cart_id = carrito._id
        const usuario = await UsersRepository.registerUser(req.body)
        const {_id, name, lastName, email, rol} = usuario
        const token = genereteToken({_id, name, lastName, email, rol})

        logger.info('usuario creado de manera correcta')

        return res.json({ok:true, usuario, token})
    } catch (error) {
        logger.error('error al crear usuarioa',error)
        return res.status(500).json({ok:false, msg:'contactar con un administrador'})
    }
}

export const cambiarPassword = async (req=request, res=response) => {
    const {email} = req.body

    const usuario = await UsersRepository.getUserEmail(email)
    if(!usuario) return res.status(400).json({ok:false, msg:'usuario invalido'})

    const token = genereteToken({email}, '1h')

    const urlReset = `${process.env.URL_RESET_PASS}?token=${token}`

    sendEmail(email, urlReset)
    return res.json({ok:true, msg:'email enviado'})
}

export const validarTokenPassword = async (req=request, res=response) => {
    try {
        const {token} = req.query
        const {email} = jwt.verify(token, process.env.JWT_SECRET_KEY)
        return res.json({ok:true, token, email})
    } catch (error) {
        logger.error(error)
        return res.status(401).json({ok:false, msg:'token invalido'})
    }
}

export const resetPassword = async (req=request, res=response) => {
    try {
        const {token, password} = req.query
        const {email} = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const usuario = await UsersRepository.getUserEmail(email)
        if(!usuario) return res.status(400).json({ok:false, msg:'email invalido'})

        const validPassword = isValidPassword(password, usuario.password)
        if (validPassword) return res.status(400).json({ok:false, msg:'la contraseña debe ser diferente a la anterior'})

        usuario.password = createHash(password)
        usuario.save()

        return res.json({ok:true, msg:'contraseña cambiada'})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({ok:false, msg:'hablar con un admin'})
    }
}