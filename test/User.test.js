import { expect } from "chai"
import supertest from 'supertest'
import { authRouter } from '../src/routes/auth.js'

const request = supertest(authRouter)

describe('Testing Auth Router', () => {

    describe('POST /login', () => {
        it('login', async () => {
            const response = await request.post('/login').send({
                email: '',
                password: ''
            })
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('token')
        })

        it('loggin fallido', async () => {
            const response = await request.post('/login').send({
                email: '',
                password: ''
            })
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('msg')
        })
    })

    describe('POST /register', () => {
        it('registro existoso', async () => {
            const response = await request.post('/register').send({
                name: 'Test User',
                email: '',
                password: ''
            })
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('token')
        })

        it('registro fallido', async () => {
            const response = await request.post('/register').send({
                email: '',
                password: ''
            })
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('msg')
        })
    })
    describe('POST /cambiar-password', () => {
        it('contraseña cambiada exitosamente', async () => {
            const response = await request.post('/cambiar-password').send({
                email: '',
                password: ''
            })
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('error al cammbiar contraseña', async () => {
            const response = await request.post('/cambiar-password').send({
                email: '',
                password: ''
            })
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('msg')
        })
    })

    describe('GET /reset-password', () => {
        it('token valido', async () => {
            const response = await request.get('/reset-password').query({ token: '' })
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('token')
        })

        it('token invalido', async () => {
            const response = await request.get('/reset-password').query({ token: '' })
            expect(response.status).to.equal(401)
            expect(response.body).to.have.property('msg')
        })
    })

    describe('POST /reset-password', () => {
        it('contraseña restaurada', async () => {
            const response = await request.post('/reset-password').send({
                token: '',
                password: ''
            })
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('msg')
        })

        it('error al restaurar contraseña', async () => {
            const response = await request.post('/reset-password').send({
                token: '',
                password: ''
            })
            expect(response.status).to.equal(400)
            expect(response.body).to.have.property('msg')
        })
    })

})