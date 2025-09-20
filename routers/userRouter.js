const { createUser, deleteUser, getone, updateUser, getAll } = require('../controllers/userController')
const uploads = require('../middleware/multer')

const router = require('express').Router()

router.post('/user',uploads.single('image'),createUser)

router.delete('/user/:id',deleteUser)

router.get('/user/:id',getone)

router.get('/users',getAll)

router.patch('/user/:id',uploads.single('image'),updateUser)

module.exports = router