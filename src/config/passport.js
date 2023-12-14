import passport, { use } from "passport"
import local from "passport-local"
import GitHubStrategy from 'passport-github2'
import { getUserByID, getUserEmail, registerUser } from "../service/user.js"
import { createHash, isValidPassword } from "../utils/bcryptPassword.js"


const LocalStrategy = local.Strategy

export const initializaPassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField:'email'}, 
        async (req, username, password, done) => { 
            try {
                const {confirmPassword} = req.body

                if(password !== confirmPassword){
                    console.log('las cotraseñas no son iguales')
                    return done(null, false)
                }

                const user = await getUserEmail(username)

                if (user){
                    console.log('usuario existente')
                    return done(null, false)
                }

                req.body.passport = createHash(password)

                const newUser = await registerUser({...req.body})

                if (newUser)
                   return done(null, newUser)

                return done(null, false)

            } catch (error) {
                done(error)
            }
        }))
    
    passport.use('login', new LocalStrategy(
        {usernameField: 'email'}, 
        async (username, password, done) => {
            try {
                const user = await getUserEmail(username)

                if(!user){
                    console.log('el user no existe')
                    done(null, false)
                }
    
                if(!isValidPassword(password, user.password)){
                    console.log('las contraseñas no coinciden')
                    return done(null, false)
                }
    
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        const user = await getUserByID(id)
        done(null, user)
    })

    passport.use('github', new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json.email
                const user = await getUserEmail(email)

                if(user)
                  return done(null, user)

                const newUser ={
                    name: profile._json.name,
                    email,
                    password: '.$',
                    image:profile._json.avatar_url,
                    github: true,
                }
                const result = await registerUser({...newUser})

                return done(null, result)
            } catch (error) {
                done(error)
            }
    }))
}