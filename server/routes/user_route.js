import express from 'express'
import { isauth, login, logout, register } from '../controllers/user_controller.js'
import Authuser from '../middlewares/auth.js';

const userrouter =express.Router()

userrouter.post('/register',register)
userrouter.post("/login", login);
userrouter.get("/is-auth",Authuser,isauth);
userrouter.get("/logout",Authuser, logout);

export default userrouter