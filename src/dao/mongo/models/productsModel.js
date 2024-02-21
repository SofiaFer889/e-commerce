import { Schema, model } from "mongoose"

const nameCollection = 'product'

const productSchema = new Schema({
    title: {type: String, required:[true,'el campo es obligatorio']},
    description: {type: String, required:[true,'el campo es obligatorio']},
    code: {type: String, required:[true,'el campo es obligatorio'], unique:true},
    price: {type: Number, required:[true,'el campo es obligatorio']},
    status: {type:Boolean, default:true},
    stock: {type: Number, required:[true,'el campo es obligatorio']},
    category: {type: String, required:[true,'el campo es obligatorio']},
    thumbnails: {type: String},
    owner:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'el owner es obligatorio']
    }
})

productSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})
    
export const productModel = model(nameCollection, productSchema)