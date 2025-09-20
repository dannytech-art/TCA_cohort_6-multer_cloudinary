const usermodel = require('../models/userModel')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')
exports.createUser = async (req,res)=> {
    try {
        const { fullName, email, gender } = req.body
        const file = req.file
    const userExist = await usermodel.findOne({email: email.toLowerCase()})
      if (userExist) {
        res.status(400).json({
            message: `user exist `
        })
        }
        const result = await cloudinary.uploader.upload(file.path)
             fs.unlinkSync(file.path)
      const image = {
            url: result.secure_url,
            publicId: result.public_id
        }
      const user = new usermodel({
        fullName,
        email,
        gender,
        profilePicture : image
      })

      await user.save()
      fs.unlinkSync(file.path)
      res.status(201).json({
        message: `user successfully registered`,
        data: user
      })
    } catch (error) {
        fs.unlinkSync(req.file.path)
        res.status( 500).json({
            message: error.message
        })
    }
}
exports.deleteUser = async (req,res)=>{
    const {id} = req.params
const user = await usermodel.findByIdAndDelete(id)
       if (!user) {
        res.status(404).json({
            message: `user not found`
        })
        // delete from cloudinary
        await cloudinary.uploader.destroy(user.profilePicture.publicId)
        res.status(200).json({
        message: `user successfully deleted`,
        data: user
       })
    }
    try {
        
    } catch (error) {
        res.status( 500).json({
            message: error.message
        })
    }
}
exports.getAll = async (req,res)=>{
     try {
        const user = usermodel.find()
        res.status(200).json({
            message: `users availabe and they are ${user.length()}`,
            data: user
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}