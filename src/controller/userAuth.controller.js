const User = require("../model/userModel");
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

exports.register= async(req , res)=>{
    try {
        const {name , email, password}= req.body;
        let user= await User.findOne({email})
        const hashedPassword = await bcrypt.hash(password, 10);

      if(!user)
      {
        let user= await User.create({name , email, password: hashedPassword });
         console.log("user" ,user);
         const accessToken= jwt.sign({email:email } , process.env.JWT_SECRET_KEY , {expiresIn:process.env.JWT_EXPIRES_IN})
         const refreshToken= jwt.sign({email:email} , process.env.REFRESH_TOKEN_SECRET_KEY , {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN})
        return res.status(201).send({ message: 'User created successfully' ,  accessToken, refreshToken});

        
      }
      return res.status(401).json({message:"user already register"})
    } catch (err) {
        res.status(500).json({message:`register error ${err.message}`})
    }
};

exports.loginUser=async(req,res)=>{
    try {
        const { email , password } = req.body
        const user= await User.findOne({email});

        if(!user)
        {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const isPasswordValid= await bcrypt.compare(password , user.password)
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
          }

        const accessToken= jwt.sign({email:email } , process.env.JWT_SECRET_KEY , {expiresIn:process.env.JWT_EXPIRES_IN})
        const refreshToken= jwt.sign({email:email} , process.env.REFRESH_TOKEN_SECRET_KEY , {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN})
        user.refreshToken=refreshToken
        await user.save();
         res.status(201).json({message:`User login successfully` ,  accessToken, refreshToken})
    } catch (err) {
        res.status(500).json({message:`register error ${err.message}`})
    }
}
