const Product=require('../models/Product');
const Firm=require('../models/Firm')
const multer=require('multer');
const path=require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Use unique file names
    }
});

const upload=multer({storage:storage})

const addProduct=async(req,res)=>{
    try{
        const {productName,price,category,bestSeller,description}=req.body;

        const image =req.file? req.file.filename: undefined;

        const firmId=req.params.FirmId;

        const firm=await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json("Firm not found")
        }

        const product=new Product({
            productName,price,category,image,bestSeller,description,firm:firm._id
        })

        await product.save()

        firm.products.push(product._id)

        await firm.save()

        res.status(200).json({product})

    }catch(error){
        console.log("the error is:",error);
        res.status(500).json("Insternal Server Error");
    }
};

const getproductsByFirm=async(req,res)=>{
    try{
        const firmId=req.params.FirmId;
        const firm=await Firm.findById(firmId)

        if(!firm){
            return res.status(404).json("Firm not found")
        }

        const restaurantName=await firm.firmName;
        const products=await Product.find({firm:firmId});
        res.status(200).json({restaurantName,products})
    }catch(error){
        res.status(500).json("Insternal Server Error");
    }
}

const deleteProductById=async(req,res)=>{
    try{
        const productId=req.params.productId
        const product=await Product.findById(productId)
        const firmId=product.firm

        const firm=await Firm.findById(firmId)
        {/*const deleteproductIDInFirm=await firm.updateOne({products:productId},{$pull:{products:productId}})*/}
        firm.products.pop(productId)
        firm.save()

        const deleteproduct=await Product.findByIdAndDelete(productId);

        if(!deleteproduct){
            return res.status(404).json('No product found')
        }else{
            return res.status(200).json({message:'Product deleted'})
        }


    }catch(error){
        res.status(500).json("Insternal Server Error");
    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getproductsByFirm,deleteProductById};