import mongoose, { mongo } from "mongoose"
const connect=async()=>{
    try{
        // mongoose.connection.on('connected',()=>console.log('datadase connected'))
        await mongoose.connect(`${process.env.MongoDb_URI}/greencart`)
    console.log('MongoDB Connected')
    }
    catch(error){
        console.log('Error Message ',error.message)
    }
}

export default connect