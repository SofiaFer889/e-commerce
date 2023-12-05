import { Schema } from "mongoose"

const nameCollection = 'product'

const productSchema = new Schema({
    title: String,
    description: String,
    code: {String, unique: true},
    price: Number,
    status: {Boolean, default: true},
    stock: Number,
    category: String,
    thumbnails: [String],
})

productSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v
        return ret
    }
})
    
export default ProductModel = model(nameCollection, productSchema)