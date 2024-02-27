import express from "express"
import 'dotenv/config'
import cors from 'cors'
import swaggerJSDoc from "swagger-jsdoc"
import SwaggerUiExpress from "swagger-ui-express"
import { cartsRouter, productsRouter, authRouter} from './routes/index.js'
import __dirname from './utils.js'
import { dbConnection } from "./database/config.js"
import logger from "./utils/logger.js"
import loggerRouter from './routes/logger.js'
import errorHandler from "./utils/errorHandler.js"


const app = express()
const PORT = process.env.PORT

const swaggerOption = {
    definition: {
        openapi:'3.1.0',
        info:{
            title:'Documetacion Api',
            description:'Proyecto Pizzeria'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
}

const spec = swaggerJSDoc(swaggerOption)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api', loggerRouter)
app.use('/doc/api', SwaggerUiExpress.serve, SwaggerUiExpress.setup(spec))

await dbConnection()

app.use(errorHandler)

app.listen(PORT, () => { logger.info(`Aplicación corriendo en el puerto ${PORT}`) });