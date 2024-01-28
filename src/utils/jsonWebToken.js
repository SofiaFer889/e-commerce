import jwt from "jsonwebtoken"

export const genereteToken = (user) => {
    try {
        return token = jwt.sign({...user}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})
    } catch (error) {
        console.log(error)
        throw error
    }
}