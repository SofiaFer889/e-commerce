import { request, response } from "express"
import { validationResult } from "express-validator"
import  jwt  from "jsonwebtoken"


export const isAdmin = (req=request, res=response, next)=> {
    if(req.rol === 'admin' || req.rol === 'premium')
    return res.status(403).json({ok:false, msg: 'permisos insuficientes'})

    next()
}

export const validarCampos = (req = request, res = response, next) => {
    const errores = validationResult(req)

    if(!errores.isEmpty()) {
        return res.status(400).json(errores)
    }
    
    next()
}

export const validarJWT = (req=request, res=response, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({ok:false, msg: 'no hay token en la peticion'})
    }
    try {
        const {_id, email, rol} = jwt.verify(token, process.env.JTW_SECRET_KEY)
        req._id=_id
        req.email=email
        req.rol=rol
    } catch (error) {
        console.log(error)
        return res.status(401).json({ok:false, msg: 'el token no es valido'})
    }

    next()
}