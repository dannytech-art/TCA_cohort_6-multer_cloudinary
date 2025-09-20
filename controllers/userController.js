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
        const user = await usermodel.find()
        res.status(200).json({
            message: `users availabe`,
            data: user
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}
exports.getone = async (req,res)=>{
    const id = req.params.id
     try {
        const user = await usermodel.findById(id)
        res.status(200).json({
            message: `users availabe`,
            data: user
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, gender } = req.body;
    const file = req.file
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
     const imageDetails = []
         for (const image of file) {
             const uploadResult = await cloudinary.uploader.upload(image.path)
             const fileInfo = {
                 url: uploadResult.secure_url,
                 publicId: uploadResult.public_id
             }
             imageDetails.push(fileInfo)
             fs.unlinkSync(files.path)
         }

    const data = {
      fullName: fullName || product.fullName,
      email: email || product.email,
      gender :gender || product.gender,
      images: imageDetails
    };


    const updatedProduct = await productModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};