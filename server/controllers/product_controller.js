import Product from "../models/product.js";
import {v2 as cloudinary} from 'cloudinary';

//Add product: /api/product/add
export const addproduct=async(req,res)=>{
    try {
        const productdata=JSON.parse(req.body.productdata)
    const images=req.files
    let imagesurl=await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
        return result.secure_url
    }))
    const data= await Product.create({...productdata,image:imagesurl})
    return res.json({success:true,msg:`${data.name} product is added`})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})        
    }
}

//Product list /api/product/list
export const productlist=async(req,res)=>{
    try {
        const list=await Product.find({})
        return res.json({success:true,list})
    } catch (error) {
        console.log(error.message)
        return res.json({success:true,msg:error.message})
    }
}

//Get single product: /api/product/:id
export const productbyId=async(req,res)=>{
    try {
        const {id}=req.body
        const productdata=await Product.findById(id)
        return res.json({success:true,productdata})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})
    }
} 

//Update product instock: /api/product/stock
export const productStock=async(req,res)=>{
    try {
        const {id,instock}=req.body
        await Product.findByIdAndUpdate(id,{instock})
        return res.json({success:true,msg:'Stock updated'})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,msg:error.message})
    }
} 