import {UserDao} from "../dao/index.js"

export const getUserByID = async (id) => await UserDao.getUserByID(id)

export const getUserEmail = async (email) => await UserDao.getUserEmail(email)

export const registerUser = async (user) => await UserDao.registerUser(user)