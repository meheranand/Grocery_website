import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'

//Register user : api/user/register
export const register=async (req,res)=>{
    try{
        const {name,email,password,cartitems}=req.body
        if(!name || !email || !password){
            return res.json({success:false,msg:'Missing Details'})
        }
        const existuer=await User.findOne({email})

        if(existuer){
            return res.json({success:false,msg:'User Already Exists'})
        }
        const hashpassword=await bcrypt.hash(password,10)

        const user=await User.create({name,email,password:hashpassword,cartitems})

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*1000,
        })
        // res.cookie("token", token, {
        //   httpOnly: true,
        //   secure: false, // okay for localhost
        //   sameSite: "lax", // or "none" if using secure
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });

        return res.json({success:true,msg:{email:user.email,name:user.name}})
    }
    catch(error){
        res.json({success:false,msg:error.message})
    }
}

//Login user: /api/user/login
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body

    if(!email || !password){
        return res.json({success:false,msg:'Missing Details'})
    }

    const user=await User.findOne({email})
    if(!user){
        return res.json({success:false,msg:'User not exists Pls Register'})
    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,msg:'Invalid Credentials pls check'})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 1000,
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // okay for localhost
    //   sameSite: "lax", // or "none" if using secure
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    return res.json({
      success: true,
      msg: "Succefully Logged in",
      user: { name: user.name ,email:user.email},
    });
    }
    catch(error){
        return res.json({success:false,msg:error.message})
    }
}

//Authorize user: /api/user/is-auth
export const isauth=async(req,res)=>{
    try {
        const id = req.userid;
        const user = await User.findById(id).select('-password');
        return res.json({
          success: true,
          user
        })
    } catch (error) {
        return res.json({success:false,msg:error.message})
    }
}

//logout user: /api/user/logout
export const logout=async(req,res)=>{
    try {
        res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        // res.clearCookie("token" ,{
        //   httpOnly: true,
        //   secure: false, // okay for localhost
        //   sameSite: "lax", // or "none" if using secure
        //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });
        return res.json({success:true,msg:'logged out sucesfully'})
    } catch (error) {
        return res.json({success:false,msg:error.message})
    }
}
