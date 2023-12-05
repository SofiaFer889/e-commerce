import express from "express"
import { Server } from "socket.io"
import {engine} from "express-handlebars"
import products from "./routes/products.js"
import carts from "./routes/carts.js"
import views from './routes/views.js'
import __dirname from './utils.js'

const app = express()
const PORT = 8080

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
    console.log('conectado desde el front')
})


{/*<script src="/socket.io/socket.io.js"></script>
    <script src="/js/index.js"></script>*/}