const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const dotEnv=require('dotenv')

dotEnv.config()

const secretKey=process.env.WhatIsYourName

const vendorRegister=async(req,res)=>{
    const{username,email,password}=req.body
    try{
        const  vendorEmail=await Vendor.findOne({email})
        if (vendorEmail){
            return res.status(400).json("Email already taken")
        }
        const hashedpassword=await bcrypt.hash(password,10)

        const newVendor= new Vendor({
            username,
            email,
            password:hashedpassword
        });
        await newVendor.save()
        res.status(201).json({message:"Vendor Registered successfully"})
        console.log("Registered Successfully")
    }catch(error){
        res.status(500).json({Error:"Internal server error"})
        console.log("The error is:",error)
    }
}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body
    try{
        const vendor=await Vendor.findOne({email})
        if (!vendor ||!(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid username or password "})
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})

        res.status(200).json({success:"Login Successful",token})
        console.log(email,"The token is:",token)
    }catch(error){
        res.status(500).json({Error:"Internal server error"})
        console.log("The error is:",error)
    }
}

const getAllvendors=async(req,res)=>{
    try{
        const vendors=await Vendor.find().populate('firms');
        res.json({vendors})
    }catch(error){
        console.log("The error is:",error);
        res.status(500).json({Error:"Internal server error"});
    }
}

const getvendorById=async(req,res)=>{
    try{
        const vendorId=req.params.id;

        const vendor=await Vendor.findById(vendorId).populate('firms');
        
        if(!vendor){
            return res.status(404).json("vendor not found");
        }

        res.status(200).json({vendor})
    }catch(error){
        console.log("the error is:",error);
        res.status(500).json({Error:"Internal Server Error"});
    }
}

module.exports={vendorRegister,vendorLogin,getAllvendors,getvendorById}