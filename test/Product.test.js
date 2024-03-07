import { expect } from "chai"
import supertest from 'supertest'
import { productsRouter } from '../src/routes/products.js'

const request = supertest(productsRouter)

describe('Testing Products Router', () => {

    describe('GET /', () => {
        it('lisa de productos', async () => {
            const response = await request.get('/')
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an('array')
        })
    })

    describe('GET /:pid', () => {
        it('id del producto', async () => {
            const response = await request.get('/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('product')
        })

        it('id del producto invalido', async () => {
            const response = await request.get('/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('POST /', () => {
        it('producto añadido', async () => {
            const response = await request.post('/')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })
    })

    describe('PUT /:pid', () => {
        it('producto actualizado', async () => {
            const response = await request.put('/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id del producto invalido', async () => {
            const response = await request.put('/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

    describe('DELETE /:pid', () => {
        it('producto eliminado', async () => {
            const response = await request.delete('/valid-product-id')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('id del producto invalido', async () => {
            const response = await request.delete('/invalid-product-id')
            expect(response.status).to.equal(404)
        })
    })

})