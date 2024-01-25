import { request, response } from "express"
import{CartsRepository, ProductsRepository} from '../repositories/index.js'
import { cloudinary } from "../config/cloudinary.js"
import { validFileExtension } from "../utils/validFileExtension.js"
export const homeView = async(req = request, res = response)=>{
    const limit= 50
    const {payload} = await ProductsRepository.getProducts({limit})
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
    const result = await ProductsRepository.getProducts(...req.query)
    return res.render('products', {title:'productos', result, styles:'products.css', user})
}

export const addProductView = async(req = request, res = response)=>{
    const user = req.session.user
    return res.render('addProduct', {title:'addProduct', user})
}

export const addProductPostView = async(req = request, res = response)=>{
    const {title, description, price, code, stock, category} = req.body

    if(!title, !description, !price, !code, !stock, !category)
        return res.status(404).json({msg:`los campos [title, description, price, code, stock, category] son obligatorios`})
        
    const existeCode = await ProductsRepository.getProductByCode(code)

    if(existeCode)
        return res.status(400).json({msj: 'el odigo ingresado  ya existe'})

    if(req.file){
        const isValidExtension = validFileExtension(req.file.originalname)
            if(!isValidExtension)
              return res.status(404).json({msg:'la extension no es valida'})

        const {secure_url} = await cloudinary.uploader.upload(req.file.path)
        req.body.thumbnails = secure_url
    }

    await ProductsRepository.addProduct({...req.body})

    return res.redirect('/products')
}

export const cartIdView = async(req = request, res = response)=>{
    const user = req.session.user
    const {cid} = req.params
    const cart = await CartsRepository.getCartById(cid)
   return res.render('cart', {title:'carrito', styles:'cart.css', cart, user})
}

export const loginGetView = async(req = request, res = response)=>{

    if (!req.session.user)
        return res.redirect('/')

    return res.render('login', {styles: 'login.css', title:'Login'})
}

export const loginView = async(req = request, res = response)=>{
    if(!req.user)
      return res.redirect('/login')

    req.session.user = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        rol: req.user.rol,
        image: req.user.image
    }

    return res.redirect('/')
}

export const registerGetView = async(req = request, res = response)=>{
    if (!req.session.user)
        return res.redirect('/')
    
    return res.render('register', {styles: 'login.css', title:'Registro'})
}

export const registerPostView = async(req = request, res = response)=>{
    if(!req.user)
       return res.redirect('/register')

    return res.redirect('/login')
}

export const logoutView = (req=request, res=response)=> {
    req.session.destroy(err=>{
        if(err)
            return res.send({status: false, body: err})
        else
            return res.redirect('/login')
        
    })
}
