import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser';

// Seller login /api/seller/login
export const sellerLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (
          email === process.env.seller_email &&
          password === process.env.seller_password
        ) {
        const token = jwt.sign({ email },process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie("sellertoken",token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 7 * 24 * 60 * 1000,
        });  
        return res.json({
          success: true,
          msg: "Seller Logged in Succcessfully",
          token:token
        });
        }
        else{
        return res.json({
          success: false,
          msg: "Invalid Credentials",
        });

        }
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})
    }
}

//Seller auth /api/seller/is-auth
export const issellerAuth=async(req,res)=>{
    try {
        return res.json({success:true})
        
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})
    }
}

//Seller Logout /api/seller/logout
export const sellerLogout=async(req,res)=>{
    try {
        res.clearCookie("sellertoken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({
          success: true,
          msg: "Seller Logged out successfully",
        });
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})
    }
}