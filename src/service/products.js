import {productModel} from '../dao/models/productsModel.js'

export const getProductsService = async({limit = 2, page=1, sort, query}) =>{
    try {
        page = page === 0 ? 1 : page
        page = Number(page)
        limit = Number(limit)
        const skip = (page-1) * limit
        const sortOrederOption = {'asc': -1, 'desc': 1}
        sort =  sortOrederOption[sort] || null

        try {
            if(query)
              query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            console.log('error al parsear')
            query= {}
        }
        const queryProducts = (await productModel.find(query).limit(limit).skip(skip).lean())
        if (sort !== null)
            queryProducts.sort({price:sort})
        const [products, totalDocs] = await Promise.all([queryProducts,productModel.countDocuments(query)])
        const totalPages = Math.ceil(totalDocs/limit)
        const hasNextPage = page < totalPages
        const hasPrePage = page > 1
        const prevPage = hasPrePage ? page -1 : null
        const nextPage = hasNextPage ? page +1 : null
        return {
            totalDocs,
            totalPages,
            limit,
            query:JSON.stringify(query),
            page,
            hasNextPage,
            hasPrePage,
            prevPage,
            nextPage,
            payload: products,
        }
        
    } catch (error) {
        console.log('getProductsService ->', error)
        throw error
    }
}

export const getProductByIdService = async(pid) =>{
    try {
        return await productModel.findById(pid)
        
    } catch (error) {
        console.log('getProductByIdService ->', error)
        throw error
    }
}

export const getProductByCodeService = async(code) =>{
    try {
        return await productModel.findOne(code)
        
    } catch (error) {
        console.log('getProductByCodeService ->', error)
        throw error
    }
}

export const addProductService = async({body}) =>{
    try {
        return await productModel.create({...body})
    } catch (error) {
        console.log('addProductService ->', error)
        throw error
    }
}

export const updateProductService = async(pid, rest) =>{
    try {
       return await productModel.findByIdAndUpdate(pid, {...rest}, {new: true})
    
    } catch (error) {
        console.log('updateProductService ->', error)
        throw error
    }
}

export const deleteProductService = async(pid) =>{
    try {

       return await productModel.findByIdAndDelete(pid)
       
    } catch (error) {
        console.log('deleteProductService ->', error)
        throw error
    }
}