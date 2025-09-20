const { addProduct, deleteproduct, getone, getAll } = require('../controllers/productController')
const uploads = require('../middleware/multer')

const router = require('express').Router()

router.post('/product',uploads.array('image'),addProduct)

router.delete('/product/:id',deleteproduct)

router.get('/product/:id',getone)

router.get('/products',getAll)

// router.patch('/product/:id',uploads.single('image'),updateUser)

module.exports = router