import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'


// Home router
const Home = async( req,res)=>{
    try {
    
        res.status(200).send("Welcome to the Home page")
        
    } catch (error) {
        console.log(error)
    }
    }



// register router
const registerUser = async( req,res,next)=>{

    const {name,email,password,mobile} = req.body
   
   
    if(!name || !email || !password ||!mobile){
    return  res.status(400).json("All fields are required")
    }

try {
     const isExisted = await User.findOne({email})  /* (email:email) (but es6 me agar dono field same ho to single likh skty hai)       */
    if(isExisted){
       return res.status(400).json({message:"email already existed!!"})
    }
    }catch(error){
        next(error)
    }

    let newUser
    try{
        newUser = await User.create({
            name,
            email,
            password,
            mobile
        })
        res.status(201).json({message:"User created successfully",
          token: await newUser.generateToken() })
  
    }catch(error){
        next(error)
    }
  
     
    }



// Login router

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }
  
    let userExisted;
    try {
      userExisted = await User.findOne({email});
      
      if (!userExisted) {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
    } catch (error) {
      // return res.status(500).json("Internal server error");
      next(error)
    }
    // const isMatched =  userExisted.comparePassword(password);
    const isMatched = userExisted?  userExisted.comparePassword(password) : false;
    // const isMatched =   bcrypt.compareSync(password, userExisted.password)
    console.log(`isMatched:${isMatched}`)
  
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
  
    try {
      const token = await userExisted.generateToken();
      res.status(200).json({
        msg: "Login successful",
        token: token,
        userId: userExisted._id.toString(),
      });
    } catch (error) {
      // res.status(500).json("Internal server error");
      next(error)
    }
  };
 
// User Logic

const user = async (req,res)=>{
 try {
    const userData = req.user;
    console.log(userData)
   return  res.status(200).json({userData})
 } catch (error) {
  next(error)
    console.log(`error from the user route ${error}`);
 }

}

export {Home,registerUser,loginUser,user}