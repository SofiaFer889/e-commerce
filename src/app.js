import express from "express"
import { Server } from "socket.io"
import {engine} from "express-handlebars"
import products from "./routes/products.js"
import carts from "./routes/carts.js"
import views from './routes/views.js'
import __dirname from './utils.js'
import ProductManager from "./productManager.js"

const app = express()
const PORT = 8080

const p = new ProductManager

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', views)
app.use('/api/products', products)
app.use('/api/carts', carts)

const expressServer = app.listen(PORT,()=>{console.log(`aplicacion corriendo en el puerto ${PORT}`)})
const socketServer = new Server(expressServer)

socketServer.on('connection', socket=>{
    const products = p.getProducts()
    socket.emit('products', products)

    socket.on('agregarProducto', product=>{
        const result = p.addProduct({...product})
        if(result.product)
        socket.emit('products', result.product)
    })
})