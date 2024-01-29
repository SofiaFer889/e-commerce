import { ProductsRepository, UsersRepository } from "../repositories/index.js"

export const existeEmail = async(email) => {
    
    const emailExiste = await UsersRepository.getUserEmail(email)
    if(emailExiste)
      throw new Error(`el mail ${email}ya existe`)
}

export const existeCode = async(code) => {
    
    const codeExiste = await ProductsRepository.getProductByCode(code)
    if(codeExiste)
      throw new Error(`el code ${code}ya esta relacuinado a otro producto`)
}

export const existeProduct = async(idProduct) => {
    
  const productExiste = await ProductsRepository.getProductByCode(idProduct)
  if(productExiste)
    throw new Error(`el id ${idProduct}ya existe`)
}