import { request, response } from "express"
import { validationResult } from "express-validator"

export const auth = (req=request, res=response, next)=> {
    if(req.session?.user)
        return next()

    return res.redirect('/login')
}

export const admin = (req=request, res=response, next)=> {
    if(req.session?.user.rol === 'admin')
        return next()

    return res.redirect('/login')
}

export const validarCampos = (req = request, res = response, next) => {
    const errores = validationResult(req)

    if(!errores.isEmpty()) {
        return res.status(400).json(errores)
    }
    
    next()
}