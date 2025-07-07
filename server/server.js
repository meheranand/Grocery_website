import cookieParser from 'cookie-parser'
import express from 'express';
import cors from 'cors';
import connect from './configs/db.js';
import 'dotenv/config'
import userrouter from './routes/user_route.js';
import sellerrouter from './routes/seller_route.js';
import connectcloud from './configs/cloudinary.js';
import productrouter from './routes/product_route.js';
import cartrouter from './routes/cart_route.js';

const app=express()
const port=4000

const allowedorigins = [
  "http://localhost:5173",
  "https://vercel.com/meher-anands-projects/grocery-website-anand",
];

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedorigins , credentials: true }));

//DB Connection
await connect()
await connectcloud()

app.get('/',(req,res)=>{
    return res.send('Api is working and running')
})
app.use('/api/user',userrouter)
app.use('/api/seller',sellerrouter)
app.use('/api/product',productrouter)
app.use('/api/cart',cartrouter)

app.listen(port,()=>console.log(`Server is running at port ${port}`))