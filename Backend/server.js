const express = require ("express")
const Connect = require("./src/config/db")
require("dotenv").config()
const registerRouter=require("./src/routes/userRouter")
const loginRouter=require("./src/routes/userRouter")
const cors=require("cors")

const app=express()
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.get("/" ,(req , res)=> res.status(200).json({message:"Hello"}))

app.use("/user" , registerRouter)
app.use("/user" , loginRouter)

Connect()
app.listen(port ,()=>{
console.log(`Server running on localhost:${port}`);
})