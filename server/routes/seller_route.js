import express from 'express'
import { sellerauth } from '../middlewares/authSeller.js'
import { issellerAuth, sellerLogin, sellerLogout } from '../controllers/seller_controller.js'

const sellerrouter=express.Router()

sellerrouter.post("/login", sellerLogin);
sellerrouter.get('/is-auth',sellerauth,issellerAuth)
sellerrouter.get('/logout',sellerLogout)

export default sellerrouter