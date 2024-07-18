const express=require('express')
const firmController=require('../controllers/firmController')
const verifytoken=require('../middlewares/verifyToken')

const router=express.Router();

router.post('/add-firm',verifytoken,firmController.addFirm);

router.delete('/:FirmId',firmController.deleteFirmById);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

module.exports = router;
