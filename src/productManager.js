import fs from 'fs'
class ProductManager{
    #products
    #path

    constructor(){
        this.#path = './src/data/products.json'
        this.#products = this.#readProductInFile()
    }

    #assignProduct(){
        let id = 1
        if (this.#products.length != 0)
           id = this.#products[this.#products.length - 1].id + 1
        return id
    }

    #readProductInFile(){
        try {
            if (fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'))

            return []
        } catch(error) {
            console.log(`error al momento de guardar el archivo, ${error}`)
        }
    }

    #saveArchive() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(`error al momento de guardar el archivo, ${error}`)
        }
    }

    addProduct({title, description, price, thumbnails=[], code, stock, category, status = true}) {

        let result = 'ocurrio un error'

        if (!title || !description || !price || !code || !stock || !category)
            result = 'todos los parametros son requeridos'
        else {
            const codeRepeate = this.#products.some(p => p.code == code)
            if (codeRepeate)
               result `El codigo ${code} ya se registró`
            else {
                const id = this.#assignProduct()
                const newProduct = {
                    id,
                    title, 
                    description, 
                    price, 
                    thumbnails, 
                    code,
                    stock, 
                    category,
                    status
                }
                this.#products.push(newProduct)
                this.#saveArchive()
                result = {
                    msg:'producto agregado exitosamente',
                    product: newProduct
                }
            }

        }
        return result

    }
    getProducts(limit = 0){
        limit = Number(limit)
        if (limit > 0)
            return this.#products.slice(0, limit)
        return this.#products

    }

    getProductsByID(id){
        let status = false
        let resp = `el producto con id ${id} no existe`
        const product = this.#products.find(p => p.id == id)
        if(product){
            status = true
            resp = product
        }

        return (status, resp)
    }

    updateProduct(id, updateObject){
        let result = `el producto con id ${id} no existe`

        const index = this.#products.findIndex(p => p.id === id)

        if (index !== -1){
            const {id, ...rest} = updateObject
            const allowedProp = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'category', 'status']
            const updateProp = Object.keys(rest)
                .filter(prop => allowedProp.includes(prop))
                .reduce((obj, key) => {
                    obj[key] = rest[key]
                    return obj
                })
            this.#products[index] = {...this.#products[index], ...updateProp}
            this.#saveArchive()
            result = {
                msg: 'Producto actualizado',
                product: this.#products[index]
            }
        }

        return result
    }

    deleteProduct(id){
        const index = this.#products.findIndex(p=> p.id === id)
        if(index !==-1){
            this.#products = this.#products.filter(p=> p.id !== id)
            this.#saveArchive()
        }
    }
}

export default ProductManager