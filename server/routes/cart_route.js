import express from 'express'
import { updatecart } from '../controllers/cart_controller.js'
import Authuser from '../middlewares/auth.js'

const cartrouter=express.Router()

cartrouter.post('/update',Authuser,updatecart)

export default cartrouter