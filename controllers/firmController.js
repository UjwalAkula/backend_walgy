
const Firm=require('../models/Firm')
const Vendor=require('../models/Vendor')
const multer=require('multer')
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

const addFirm=async(req,res)=>{
    try{
        const {firmName,area,category,region,offer}=req.body

        const image =req.file? req.file.filename: undefined;

        const vendor=await Vendor.findById(req.vendorId)

        if(!vendor){
            return res.status(404).json({message:"vendor not found"})
    }

    const firm=new Firm({
        firmName,area,category,region,offer,image,vendor:vendor._id
    })

    await firm.save()

    /*vendor.firms.push(firm._id) means adding the _id of a firm document to an array named firms within a vendor document. */

     // Update the vendor document with the new firm's ID
     vendor.firms.push(firm._id); // Assuming 'firms' is an array in Vendor schema to store firm IDs
     await vendor.save();

    return res.status(200).json({message:"Firm added successfully"})
    }catch(error){
        console.log("The error is:",error)
        res.status(500).json("Insternal Server Error")
    }
}

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.FirmId

        const deletefirm=await Product.findByIdAndDelete(firmId);

        if(!deletefirm){
            return res.status(404).json('No firm found')
        }
    }catch(error){
        res.status(500).json("Insternal Server Error");
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}