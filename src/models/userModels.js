import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


 const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    mobile:{
        type:Number,  
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

 },{timestamps:true})


   userSchema.pre('save',async function(next){
          const user = this;
          if(!user.isModified('password')){
             return next();
          }
          try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password,salt);
            user.password = hashedPassword  
            next();      

          }catch(error){
            next(error)
          }
   });
   userSchema.methods.comparePassword= async function(password){
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch
    } catch (error) {
        return next(error)
        console.log(error)
    }
}


   userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },
    process.env.JWT_SECRET,
{ expiresIn:"7d"})
    } catch (error) {
        console.error(error);
        throw error;
    }
   }




 export default mongoose.model('User', userSchema)