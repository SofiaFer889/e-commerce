import {ticketModel} from './models/ticketModel.js'

export const getTicketByID = async (id) => await ticketModel.findById(id)

export const getTicketEmail = async (email) => await ticketModel.findOne({purchase:email})

export const createTicket = async (ticket) => await ticketModel.create({...ticket})