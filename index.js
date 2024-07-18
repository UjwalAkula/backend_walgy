const express=require('express')
const mongoose=require('mongoose')
const dotEnv=require('dotenv')
const bodyParser=require('body-parser')
const path=require('path');
const vendorRoutes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')

const app=express()

const port=4000

dotEnv.config()

mongoose.connect(process.env.mongodb_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error)=>{
    console.log("The error with mongoose is:",error)
})

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(port,()=>{
    console.log(`server is running on the port http://localhost:${port}`)
})

app.use('/home',(req,res)=>{
    res.send("<h1>Welcome to Walgy<h1>")
})


