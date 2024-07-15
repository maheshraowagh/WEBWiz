import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    url:{type:String,requried:true},
    service:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    provider:{type:String, required:true},

})


export default mongoose.model('Service',serviceSchema);