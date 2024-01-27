import express from "express"
import 'dotenv/config'
import { cartsRouter, productsRouter, authRouter} from './routes/index.js'
import __dirname from './utils.js'
import { dbConnection } from "./database/config.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

await dbConnection()

app.listen(PORT,()=>{console.log(`aplicacion corriendo en el puerto ${PORT}`)})