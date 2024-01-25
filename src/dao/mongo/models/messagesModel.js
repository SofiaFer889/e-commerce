import { Schema, model } from "mongoose"

const nameCollection = 'message'

const messageSchema = new Schema({
    user:{type:String, require:[true, 'el nombre es obligatorio']},
    message:{type:String, require:[true, 'el mensaje es obligatorio']}
})
    
export const messageModel = model(nameCollection, messageSchema)