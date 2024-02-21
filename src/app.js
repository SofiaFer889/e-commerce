import express from "express"
import 'dotenv/config'
import { cartsRouter, productsRouter, authRouter} from './routes/index.js'
import logger from "./utils/logger.js"
import loggerRouter from './routes/logger.js'
import __dirname from './utils.js'
import { dbConnection } from "./database/config.js"
import errorHandler from "./utils/errorHandler.js"
import cors from 'cors'


const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api', loggerRouter)

await dbConnection()

app.use(errorHandler)

app.listen(PORT, () => { logger.info(`Aplicación corriendo en el puerto ${PORT}`) });