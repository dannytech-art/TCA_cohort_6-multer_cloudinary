const { addProduct, deleteproduct, getone, getAll, updateProduct } = require('../controllers/productController')
const uploads = require('../middleware/multer')

const router = require('express').Router()

router.post('/product',uploads.array('images'),addProduct)

router.delete('/product/:id',deleteproduct)

router.get('/product/:id',getone)

router.get('/products',getAll)

router.patch('/product/:id/:indexs',uploads.array('images'),updateProduct)

module.exports = router