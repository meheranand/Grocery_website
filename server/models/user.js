import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,require:true},
    cartitems:{type:Object,default:{}},
},{minimize:false})

const User=mongoose.model('user',userSchema)

export default User