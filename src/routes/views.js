import { Router } from "express"
import { homeView, realTimeProductsView, chatView, productsView, cartIdView, loginGetView, registerGetView, loginPostView, registerPostView, logoutView} from '../controllers/views.js'
import { auth, admin } from "../middlewere/auth.js"

const router = Router()

router.get('/', homeView)
router.get('/realtimeproducts', [auth, admin], realTimeProductsView)
router.get('/chat',auth, chatView)
router.get('/products', auth, productsView)
router.get('/cart/:cid', auth, cartIdView)
router.get('/login', loginGetView)
router.post('/login', loginPostView)
router.get('/register', registerGetView)
router.post('/register', registerPostView)
router.post('/logout', logoutView)

export default router