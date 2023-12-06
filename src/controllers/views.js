import { request, response } from "express"
import { getProductsService } from "../service/products.js"
import {getCartByIdService} from '../service/carts.js'
import {getUserEmail, registerUser} from '../service/user.js'

export const homeView = async(req = request, res = response)=>{
    const limit= 50
    const {payload} = await getProductsService({limit})
    const user = req.session.user

    return res.render('home', {products: payload, styles: 'styles.css', title:'Home', user})
}

export const realTimeProductsView = async(req = request, res = response)=>{
    const user = req.session.user
    return res.render('realTimeProducts', {title:'Real Time', user})
}

export const chatView = async(req = request, res = response)=>{
    const user = req.session.user
    return res.render('chat', {styles: 'chat.css', title:'Chat', user})
}

export const productsView = async(req = request, res = response)=>{
    const user = req.session.user
    const result = await getProductsService(...req.query)
    return res.render('products', {title:'productos', result, styles:'products.css', user})
}

export const cartIdView = async(req = request, res = response)=>{
    const user = req.session.user
    const {cid} = req.params
    const cart = await getCartByIdService(cid)
   return res.render('cart', {title:'carrito', styles:'cart.css', cart, user})
}

export const loginGetView = async(req = request, res = response)=>{
    return res.render('login', {styles: 'login.css', title:'login'})
}

export const loginPostView = async(req = request, res = response)=>{
    const{email, password} = req.body
    
    const user = await getUserEmail({email})

    if(user && user.password === password){
        const userName= `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }

    return res.redirect('/login')
}

export const registerGetView = async(req = request, res = response)=>{
    return res.render('register', {styles: 'login.css', title:'register'})
}

export const registerPostView = async(req = request, res = response)=>{
    const{password, confirmPassword} = req.body
    if(password !== confirmPassword)
       return res.redirect('/register')
    
    const user = await registerUser({...req.body})

    if(user){
        const userName= `${user.name} ${user.lastName}`
        req.session.user = userName
        req.session.rol = user.rol
        return res.redirect('/')
    }

    return res.redirect('/register')
}

export const logoutView = (req=request, res=response)=> {
    req.session.destroy(err=>{
        if(err)
            return res.send({status: false, body: err})
        else
            return res.redirect('/login')
        
    })
}