import { response, request } from "express"
import { UsersRepository } from "../repositories/index.js"
import {createHash, isValidPassword} from '../utils/bcryptPassword.js'

import {generateToken} from '../utils/jsonWebToken.js'
export const loginUser = async(req=request, res=response) => {
    try {
        const {email, password} = req.body
        const usuario = await UsersRepository.getUserEmail(email)
        if(!usuario) return res.status(400).json({ok:false, msg:'datos incorrectos'})
        
        const validPassword = isValidPassword(password, usuario.password)
        if(!validPassword) return res.status(400).json({ok:false, msg:'datos incorrectos'})
        
        const token = generateToken({_id, name, lastName, email, rol})
        const {_id, name, lastName, rol} = usuario

        return res.json({ok:true, token, usuario})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'contactar con un administrador'})
    }
}
export const createUser = async(req=request, res=response) => {
    try {
        req.body.password = createHash(req.body.password)
        const token = generateToken({_id, name, lastName, email, rol})
        const {_id, name, lastName, email, rol} = usuario
        const usuario = await UsersRepository.registerUser(req.body)
        
        return res.json({ok:true, usuario, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'contactar con un administrador'})
    }
}