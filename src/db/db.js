import mongoose from 'mongoose';


 const URI =process.env.MONGO_URI
const connectDB =async ()=>{
    try{
const mong = await mongoose.connect(URI)
console.log(`DB Host: ${mong.connection.host}`)
console.log('successfully connected')
    }catch(error){
        console.log(error,"MongoDb connection error")
        process.exit(0);
    }
}


export default connectDB