const { url } = require("inspector")
const cloudinary = require("../config/cloudinary")
const productmodel = require("../models/productModel")
const fs = require('fs')

exports.addProduct = async (req,rse)=>{
    try {
        const { name, description, price} = req.body
        const files = req.files
    const goodsExist = await productmodel.findOne({name})
    if (goodsExist) {
        res.status(400).json({
            message: `product already exist try updating`
        })
    }
    const imageDetails = []
    for (const image of files) {
        const uploadResult = await cloudinary.uploader.upload(image.path)
        const fileInfo = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
        }
        imageDetails.push(fileInfo)
        fs.unlinkSync(files.path)
    }
      const product = new productmodel({
         name,
         description,
         price,
         images: imageDetails
      })

      await product.save();

    //Send a success response
    res.status(201).json({
      message: "Product added successfully",
      data: product,
     });


    } catch (error) {
        res.status( 500).json({
            message: error.message
        })
    }
}