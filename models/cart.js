const mongoose=require('mongoose');

const cartproductSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        enum:["veg","non-veg"]
    },
    bestSeller:{
        type:Boolean
    },
    firmId:[{
        type:String,
    }]
})

const cartproduct=mongoose.model('Cartproduct',cartproductSchema,'Cart');

module.exports=cartproduct;

// Schema is like a class and model is like a object of that class.