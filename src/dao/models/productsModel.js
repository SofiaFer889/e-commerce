import { Schema, model } from "mongoose"

const nameCollection = 'product'

const productSchema = new Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String,
})

productSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})
    
export const productModel = model(nameCollection, productSchema)