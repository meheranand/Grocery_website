import express from 'express'
import { addproduct, productbyId, productlist, productStock, updateproduct } from '../controllers/product_controller.js'
import { upload } from './../configs/multer.js';
import { sellerauth } from '../middlewares/authSeller.js';

const productrouter=express.Router()

productrouter.post('/add',upload.array(["images"]),sellerauth,addproduct)
productrouter.get('/list',productlist)
productrouter.put("/update",updateproduct);
productrouter.get('/:id',productbyId)
productrouter.post('/stock',sellerauth,productStock)

export default productrouter