import {userModel} from './models/usersModel.js'

export const getUserByID = async (id) => await userModel.findById(id)

export const getUserEmail = async (email) => await userModel.findOne({email})

export const registerUser = async (user) => await userModel.create({...user})