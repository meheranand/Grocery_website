import jwt from 'jsonwebtoken';
// import { cookieParser } from 'cookie-parser';

export const sellerauth=async (req,res,next)=>{
    const {sellertoken}=req.cookies
    // console.log(sellertoken)

    if(!sellertoken){
        return res.json({success:false,msg:'Not Authorized Seller'})
    }

    try {
        const decodedtoken = jwt.verify(sellertoken, process.env.JWT_SECRET);
        console.log(decodedtoken)
        if (
          decodedtoken.email == process.env.seller_email
        ) {
          next();
        } else {
          return res.json({ success: false, msg: "Seller not authorized" });
        }
    } catch (error) {
        res.json({success:false,msg:error.message})
    }
}