const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './uploads')
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const filefilter = (req, file, cb)=>{
    if (file.mimetype.startsWith('image/')) {
        cb(null,true)
    } else {
        cb(new Error(`invalid file format only images allowed`))
    }
}

const limits = {
    fileSize: 1024 * 1024 * 1
}

const uploads = multer({
    storage,
    filefilter,
    limits
})
module.exports = uploads