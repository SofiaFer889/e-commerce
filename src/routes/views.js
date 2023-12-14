import { Router } from "express"
import { homeView, realTimeProductsView, chatView, productsView, cartIdView, loginGetView, registerGetView, registerPostView, logoutView, loginView,} from '../controllers/views.js'
import { auth, admin } from "../middlewere/auth.js"
import passport from "passport"

const router = Router()

router.get('/', homeView)
router.get('/realtimeproducts', [auth, admin], realTimeProductsView)
router.get('/chat',auth, chatView)
router.get('/products', auth, productsView)
router.get('/cart/:cid', auth, cartIdView)
router.get('/login', loginGetView)
router.get('/register', registerGetView)
router.get('/logout', logoutView)
router.post('/register', passport.authenticate('register', {failureRedirect:'/register'}), registerPostView)
router.post('/login', passport.authenticate('login', {failureRedirect:'/login'}), loginView)
router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res) => { })
router.get('/login-github-callback', passport.authenticate('github', {failureRedirect:'/register'}), loginView)

export default router