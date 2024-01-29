import {request, response} from 'express'
import {ProductsRepository} from '../repositories/index.js'
import {cloudinary} from '../config/cloudinary.js'
import { validFileExtension } from '../utils/validFileExtension.js'

export const getProducts = async(req=request, res=response) =>{
    try {

        const result = await ProductsRepository.getProducts({...req.query})

        return res.json({result})
        
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const getProductById = async(req=request, res=response) =>{
    try {
        const {pid} = req.params
        const product = await ProductsRepository.getProductById(pid)
        if(!product)
           return res.status(404).json({msg:`el producto con id ${pid} no existe`})
        return res.json({product})
    } catch (error) {
        console.log('getProductById ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const addProduct = async(req=request, res=response) =>{
    try {
        const {title, description, price, code, stock, category} = req.body

        if(req.file){
            const isValidExtension = validFileExtension(req.file.originalname)
            if(!isValidExtension)
              return res.status(404).json({msg:'la extension no es valida'})

            const {secure_url} = await cloudinary.uploader.upload(req.file.path)
            req.body.thumbnails = secure_url
        }

        const product = await ProductsRepository.addProduct({...req.body})

        return res.json({product})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const updateProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const {_id, ...rest} = req.body
       const producto = await ProductsRepository.getProductById(pid)
       if(!producto)
           return res.status(400).json({msj: `el producto $(pid)no existe`})

        if(req.file) {
            const isValidExtension = validFileExtension(req.file.originalname)
            if(!isValidExtension)
              return res.status(404).json({msg:'la extension no es valida'})

            if(product.thumbnails) {
                const url = product.thumbnails.split('/')
                const nombre = url[url.length - 1]
                const [id] = nombre.split('.')
                cloudinary.uploader.destroy(id)
            }
            const {secure_url} = await cloudinary.uploader.upload(req.file.path)
            rest.thumbnails = secure_url
        }

        const product = await ProductsRepository.updateProduct(pid,rest)

       if(product)
          return res.json({msg:'producto actualizado', product})
        return res.status(404).json({msg: `no se pudo actualizar el producto con id ${pid}`})
    } catch (error) {
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const deleteProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const product = await ProductsRepository.deleteProduct(pid)
       if(product)
          return res.json({msg:'producto elimminido', product})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        console.log('deleteProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}