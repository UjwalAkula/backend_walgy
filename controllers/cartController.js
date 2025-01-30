const CartProduct = require('../models/cart');
const Firm=require('../models/Firm')

const addtocart=async(req,res)=>{
    try{
        const {productName,productId,price,category,bestSeller,firmId}=req.body

        //Document
        const product=new Cartproduct({
            productName,productId,price,category,bestSeller,firmId
        })

        await product.save()
        res.status(200).json({product})
        
    }catch(error){
        console.log("the error is:",error);
        res.status(500).json("Internal Server Error");
    }
}


