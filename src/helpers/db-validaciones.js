import { UsersRepository } from "../repositories/index.js"

export const existeEmail = async(email) => {
    
    const emailExiste = await UsersRepository.getUserEmail(email)
    if(emailExiste)
      throw new Error(`el mail ${email}ya existe`)
}