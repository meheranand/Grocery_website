import User from "../models/user.js"


//update cart /api/cart/update
export const updatecart=async(req,res)=>{
    try {
        const { cartitem } = req.body;
        await User.findByIdAndUpdate(req.userid,{cartitems:cartitem});
        res.json({ success: true, msg: "cart updated" });
    } catch (error) {
        console.log(error.message)
        res.json({success:false,msg:error.message})
    }
}