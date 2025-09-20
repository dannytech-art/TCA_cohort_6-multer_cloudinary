const { createUser, deleteUser } = require('../controllers/userController')
const uploads = require('../middleware/multer')

const router = require('express').Router()

router.post('/user',uploads.single('image'),createUser)

router.delete('/user/:id',deleteUser)

module.exports = router