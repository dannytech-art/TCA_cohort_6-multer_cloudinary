const productmodel = require("../models/productModel")

exports.addProduct = async (req,rse)=>{
    try {
        const { name, description, price} = req.body
    const goodsExist = await productmodel.findOne({name})
    if (goodsExist) {
        res.status(400).json({
            message: `product already exist try updating`
        })
    }
      
    } catch (error) {
        res.status( 500).json({
            message: error.message
        })
    }
}