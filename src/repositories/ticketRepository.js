import {TicketDao} from "../dao/index.js"

export const getTicketByID = async (id) => await TicketDao.getTicketByID(id)

export const getTicketEmail = async (email) => await TicketDao.getTicketEmail(email)

export const createTicket = async (ticket) => await TicketDao.createTicket(ticket)