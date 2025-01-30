const Customer=require('../models/Customer')
const dotEnv=require('dotenv');
const bcrypt=require('bcryptjs');

dotEnv.config()

const secretKey=process.env.WhatIsYourName;
const saltrounds=10;

const customerRegistration=async (req,res)=>{
    const {phoneNumber,username,email,password}=req.body;

    try{
        const customeremail=await Customer.findOne({phoneNumber});

        if (customeremail){
            return res.status(400).json({message:"E-mail you provided is already used."});
        }

        const hashedpassword=bcrypt.hash(password,saltrounds,secretKey);

        const newcustomer=new Customer({
            phoneNumber,
            username,
            email,
            password:hashedpassword
        });

        await newcustomer.save()

        res.status(200).json({message:"Customer successfully registered."},newcustomer);
    }catch(error){
        console.error("The error is: ",error);
        res.status(500).json({message:"Internal Server Error."});
    }
}

const customerLogin=async (req,res)=>{

    const {phoneNumber,password}=req.body;

    const currentcustomer=await Customer.findOne({phoneNumber});

    if (!currentcustomer || !await bcrypt.compare(password,currentcustomer.password)){
        return res.status(401).json({message:"User Not Found or Invalid Credentials."});
    }

    res.status(200).json({message:"User "})
}