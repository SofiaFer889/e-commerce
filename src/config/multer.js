import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let destinationFolder = 'uploads/'

        if (file.fieldname === 'image') {
            destinationFolder += 'profiles/'
        } else if (file.fieldname === 'productImage') {
            destinationFolder += 'products/'
        } else if (file.fieldname === 'documents') {
            destinationFolder += 'documents/'
        }

        cb(null, destinationFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const uploader = multer({storage})

export {uploader}