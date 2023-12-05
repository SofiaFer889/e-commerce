import fs from 'fs'
import ProductManager from './productManager.js'
class CartManager{
    #carts
    #path
    static idProduct = 0

    constructor(){
        this.#path = './src/data/carts.json'
        this.#carts = this.#readCartInFile()
    }

    #assignCart(){
        let id = 1
        if (this.#carts.length != 0)
           id = this.#carts[this.#carts.length - 1].id + 1
        return id
    }

    #readCartInFile(){
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        } catch (error) {
            console.log(`error al momento de guardar el archivo, ${error}`)
        }
    }

    createCart(){
        const newCart = {
            id: this.#assignCart(),
            products: []
        }
        this.#carts.push(newCart)
        this.#saveArchive()

        return newCart
    }

    getCartByID(id){
       const product = this.#carts.find(p => p.id == id)
       if(product)
         return product
        else
           return `Not found del producto con id ${id}`
    }

    addProductInCart(cid, pid){

        let answer = `el carrito con id ${cid} no exise`
        const indexCarrito = this.#carts.findIndex(c=> c.id === cid)
        
        if(indexCarrito !==-1){
            const indexProductInCart = this.#carts[indexCarrito].products.findIndex(p=> p.id === pid)
            const p = new ProductManager()
            const product = p.getProductsByID(pid)

            if(product.status && indexProductInCart===-1){
                this.#carts[indexCarrito].products.push({id: pid, 'quantity': 1})
                this.#saveArchive()
                answer='productos agregados al carrito'
            }else if (product.status && indexProductInCart !==-1){
                ++this.#carts[indexCarrito].products[indexProductInCart].quantity
                this.#saveArchive()
            }else{
                answer = `el producto con id ${pid} no existe`
            }

        }

        return answer
    }

}

export default CartManager