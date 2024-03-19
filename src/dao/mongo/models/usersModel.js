import { Schema, model } from "mongoose"

const nameCollection = 'User'

const UserSchema = new Schema({
    name: {type: String, require:[true]},
    lastName: {type: String},
    email: {type: String, require:[true], unique:true},
    password: {type: String, require:[true]},
    rol: {type: String, default: 'user', enum:['user', 'admin', 'premium']},
    status: {type: Boolean, default:true},
    fechaCreacion: {type: Date, default:Date.now},
    image: {type: String},
    github: {type: Boolean,default:false},
    cart: {type:Schema.Types.ObjectId, ref:'Cart'},
    documents: [{ name: String, reference: String }],
    last_connection: { type: Date },
})

UserSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})

export const userModel = model(nameCollection, UserSchema)