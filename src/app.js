import express from "express"
import { Server } from "socket.io"
import {engine} from "express-handlebars"
import 'dotenv/config'
import products from "./routes/products.js"
import carts from "./routes/carts.js"
import views from './routes/views.js'
import __dirname from './utils.js'
import { dbConnection } from "./database/config.js"
import {messageModel} from './dao/models/messagesModel.js'
import { addProductService, getProductsService, } from "./service/products.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', views)
app.use('/api/products', products)
app.use('/api/carts', carts)

await dbConnection()

const expressServer = app.listen(PORT,()=>{console.log(`aplicacion corriendo en el puerto ${PORT}`)})
const io = new Server(expressServer)

io.on('connection', async (socket)=>{
    const {payload} = await getProductsService({})
    const products = payload

    socket.emit('products', payload)

    socket.on('agregarProducto', async (product)=>{
        const newProduct = await addProductService({...product})
        if(newProduct)
        products.push(newProduct)
        socket.emit('products', products)
    })

    const messages = await messageModel.find()
    socket.emit('message', messages)

    socket.on('message', async(data)=> {
        const newMessage = await messageModel.create({...data})
        if(newMessage){
            const messages = await messageModel.find()
            io.emit('messageLog', messages)
        }
    })

    socket.broadcast.emit('nuevo_user')

})