const express = require ("express")
const Connect = require("./src/config/db")
require("dotenv").config()
const registerRouter=require("./src/routes/userRouter")
const loginRouter=require("./src/routes/userRouter")
const cors=require("cors")
const path = require("path");
const authMiddleware = require("./src/middleware/authMiddleware")

const app=express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.get("/" ,authMiddleware ,(req , res)=> res.status(200).json({message:"Hello"}))

app.use("/user" , registerRouter)
app.use("/user" , loginRouter)

Connect()
app.listen(port ,()=>{
console.log(`Server running on localhost:${port}`);
})