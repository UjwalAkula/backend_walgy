const productController=require('../controllers/productController')
const express=require('express');
const router=express.Router();


router.post('/add-product/:FirmId',productController.addProduct);

router.get('/:FirmId/products',productController.getproductsByFirm);

router.delete('/:productId',productController.deleteProductById);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

module.exports=router;