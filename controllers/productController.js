const cloudinary = require("../config/cloudinary")
const productmodel = require("../models/productModel")
const fs = require('fs')

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body
    const files = req.files

    const goodsExist = await productmodel.findOne({ name })
    if (goodsExist) {
      return res.status(400).json({
        message: `Product already exists, try updating`
      })
    }

    const imageDetails = []

    for (const image of files) {
      const uploadResult = await cloudinary.uploader.upload(image.path)

      imageDetails.push({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id
      })

      fs.unlinkSync(image.path)
    }

    const product = new productmodel({
      name,
      description,
      price,
      images: imageDetails
    })

    await product.save()

    res.status(201).json({
      message: "Product added successfully",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.getAll = async (req,res)=>{
     try {
        const product = await productmodel.find()
        res.status(200).json({
            message: `product availabe`,
            data: product
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
        const product = await productmodel.findById(id)
        res.status(200).json({
            message: `product availabe`,
            data: product
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}
exports.deleteproduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productmodel.findById(id)

    if (!product) {
      return res.status(404).json({ message: "product not found" })
    }

    // delete from cloudinary if image exists
    if (product.profilePicture && product.images.publicId) {
      await cloudinary.uploader.destroy(product.images.publicId)
    }

    // delete from db
    await product.deleteOne()

    res.status(200).json({
      message: "product successfully deleted",
      data: product
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id, indexes } = req.params; 
    const { name, description, price } = req.body
    const files = req.files; 

    
    const replaceIndexes = indexes
      ? indexes.split(",").map((i) => parseInt(i.trim()))
      : [];

    const product = await productmodel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedImages = [...product.images];

    
    if (files && files.length > 0 && replaceIndexes.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const index = replaceIndexes[i];

        if (index === undefined) continue; 

        
        if (updatedImages[index] && updatedImages[index].publicId) {
          await cloudinary.uploader.destroy(updatedImages[index].publicId);
        }

        
        const uploadResult = await cloudinary.uploader.upload(files[i].path);

        
        updatedImages[index] = {
          url: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };

        
        fs.unlinkSync(files[i].path);
      }
    }

    
    const data = {
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      images: updatedImages,
    };

    
    const updatedProduct = await productmodel.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
