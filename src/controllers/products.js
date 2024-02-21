import {request, response} from 'express'
import {ProductsRepository} from '../repositories/index.js'
import {cloudinary} from '../config/cloudinary.js'
import { validFileExtension } from '../utils/validFileExtension.js'
import logger from '../utils/logger.js'
export const getProducts = async(req=request, res=response) =>{
    try {

        const result = await ProductsRepository.getProducts({...req.query})

        logger.info('productos obtenidos correctamente')

        return res.json({result})
        
    } catch (error) {
        logger.error('Error al obtener productos:', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const getProductById = async(req=request, res=response) =>{t
    try {
        const {pid} = req.params
        const product = await ProductsRepository.getProductById(pid)
        if(!product)
           return res.status(404).json({msg:`el producto con id ${pid} no existe`})
        return res.json({product})
    } catch (error) {
        logger.error('getProductById ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const addProduct = async(req=request, res=response) =>{
    try {
        const {title, description, price, code, stock, category} = req.body

        const {_id}= req


        if(!title || !description || !price || !code || !stock || !category) return res.status(400).json({msg:'datos incompletos'})
        if(req.file){
            const isValidExtension = validFileExtension(req.file.originalname)
            if(!isValidExtension)
                   return res.status(404).json({msg:'la extension no es valida'})

            const {secure_url} = await cloudinary.uploader.upload(req.file.path)
            req.body.thumbnails = secure_url
        }

        req.body.owner = _id

        const product = await ProductsRepository.addProduct({...req.body})

        return res.json({product})
    } catch (error) {
        logger.error('Error al agregar producto:', error)
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
        logger.error('Error al actualizar producto:', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const deleteProduct = async(req=request, res=response) =>{
    try {
       const {pid} = req.params
       const {rol, _id} = req
       if (rol === 'premium'){
            const product = await ProductsRepository.getProductById(pid)
            if(!product) return res.status(400).json({msj:`el producto con id ${pid} no existe`})
            
            if (product.owner.toString() === _id){
                const product = await ProductsRepository.deleteProduct(pid)
                if(product)
                    return res.json({msg:'producto elimminido', product})
                return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
            }
        }

       const product = await ProductsRepository.deleteProduct(pid)
       if(product)
          return res.json({msg:'producto elimminido', product})
        return res.status(404).json({msg: `no se pudo eliminar el producto con id ${pid}`})
    } catch (error) {
        logger.error('deleteProduct ->', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}

export const mockingProducts = async(req = request, res=response) => {
    try {
        const mockedProducts = Array.from({length: 100}, (_, index) =>({
            _id: `mockedProduct${index + 1}`,
        }))
        return res.json({mockedProducts})
    } catch (error) {
        logger.error('Error al simular productos:', error)
        return res.status(500).json({msg:'hablar con un administrador'})
    }
}