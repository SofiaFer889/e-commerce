import { expect } from "chai"
import supertest from 'supertest'
import { cartsRouter } from '../src/routes/carts.js'

const request = supertest(cartsRouter)

describe('Testing Carts Router', () => {

    describe('GET /:cid', () => {
        it('id de carrito', async () => {
            const response = await request.get('/valid-cart-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('cart')
        })

        it('id del carrito  invalido', async () => {
            const response = await request.get('/invalid-cart-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('POST /:cid/product/:pid', () => {
        it('producto añadido corectamente', async () => {
            const response = await request.post('/valid-cart-id/product/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id de carrito o producto invalido', async () => {
            const response = await request.post('/invalid-cart-id/product/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('DELETE /:cid/products/:pid', () => {
        it('producto eliminado del carrito', async () => {
            const response = await request.delete('/valid-cart-id/products/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id del producto o carrito invalido', async () => {
            const response = await request.delete('/invalid-cart-id/products/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('PUT /:cid/products/:pid', () => {
        it('producto actualizado en el carrito', async () => {
            const response = await request.put('/valid-cart-id/products/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id del producto o carrito invalido', async () => {
            const response = await request.put('/invalid-cart-id/products/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('POST /:cid/purchase', () => {
        it('purchase', async () => {
            const response = await request.post('/valid-cart-id/purchase')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id del carrito invalido', async () => {
            const response = await request.post('/invalid-cart-id/purchase')
            expect(response.status).to.equal(404)
        })
    })

})