import express from "express"
import products from "./routes/products.js"
import carts from "./routes/carts.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    return res.send('hola mundo')
})
app.use('/api/products', products)
app.use('/api/carts', carts)

app.listen(PORT,()=>{
    console.log(`aplicacion corriendo en el puerto ${PORT}`)
})