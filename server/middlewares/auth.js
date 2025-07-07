
import cookieParser from "cookie-parser";
import  jwt  from 'jsonwebtoken';

const Authuser=async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return res.json({success:false,msg:'User not authorized'})
    }
    try {
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedtoken) {
          req.userid = decodedtoken.id;
        } else {
          return res.json({ success: false, msg: "User not authorized" });
        }
        next()
    } catch (error) {
        return res.json({ success: false, msg: error.message});
        
    }
}

export default Authuser