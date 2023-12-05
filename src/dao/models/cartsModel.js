import { Schema, model } from "mongoose"

const nameCollection = 'cart'

const cartSchema = new Schema({
    products:[
        {
            _id:false,
            id:{
                type:Schema.Types.ObjectId,
                ref:'product'
            },
            quantity:{
                type: Number,
                require:[true, 'la cantidad es obligatoria']
            }
        }
    ]
})

cartSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})
    
export const cartModel = model(nameCollection, cartSchema)