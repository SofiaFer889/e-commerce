import jwt from "jsonwebtoken"

export const genereteToken = (user, timeExpire='8h') => {
    try {
        return token = jwt.sign({...user}, process.env.JWT_SECRET_KEY, {expiresIn: timeExpire})
    } catch (error) {
        console.log(error)
        throw error
    }
}