import { Schema, model } from "mongoose"

const nameCollection = 'Ticket'

const TicketSchema = new Schema({
    code: {type: String, require:[true]},
    purchase_datetiime: {type: Date, default:Date.now},
    amount: {type: Number,require:[true]},
    purchase: {type:String, require:[true]},
    items: {type: Object, required: [true]}
})

TicketSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})

export const ticketModel = model(nameCollection, TicketSchema)