import User from '../models/userModels.js'
import Contact from "../models/contactModels.js"
import serviceModels from '../models/serviceModels.js'



// USERS DETAILS

const getAllUsers=async(req,res,next)=>{
 try {
    const users = await User.find({},{password:0})
    // console.log(users)
    if(!users || users.length===0){
        return res.status(404).json({message:"NO Users Found"})
    }
    return res.status(200).json(users)
 } catch (error) {
    next(error)
 }

}

// CONTACT DETAILS

const getAllContacts = async(req,res,next) =>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"NO contact Found"})
        }
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

// Delete User By Id

const deleteUserById= async(req,res)=>{
     try {
        const id = req.params.id;
        await User.deleteOne({_id:id})
        res.status(200).json({message:"User delete successfully"});
       
     } catch (error) {
        next()
     }
}

// single user logic

const getUserById= async(req,res,next)=>{
    try {
       const id = req.params.id;
      const data = await User.findOne({_id:id},{password:0})
       res.status(200).json(data);
      
    } catch (error) {
       next()
    }
}



// Update userById
const updateUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateUserData = req.body;
  
      // Check if the user exists
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user
      const updatedData = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: updateUserData,
        },
        { new: true } // This option returns the updated document rather than the original
      );
  
      return res.status(200).json(updatedData);
    } catch (error) {
      next(error); 
    }
  };


//   deleting contact by id


const deleteContactById = async(req,res,next) =>{
    try {
        const id = req.params.id;
        console.log(id)
        await Contact.deleteOne({_id:id})
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        next(error)
    }
    
}

const getAllService = async(req,res,next)=>{


  try {
    const response = await serviceModels.find(); 
    if (!response) {
      res.status(404).json({ msg: "No service found" });
      return;
    }
    res.status(200).json({ msg: response });
  } catch (error) {
    next(error)
  }
}

// createService

const createService = async (req, res, next) => {
  const { url, service, description, price, provider } = req.body;

  
  if (!url || !service || !description || !price || !provider) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newService = await serviceModels.create({
      url,
      service,
      description,
      price,
      provider,
    });

    res.status(201).json({ message: "Service created successfully", data: newService });
  } catch (error) {
    next(error);
  }
};


export  {getAllUsers, getAllContacts,getAllService,deleteUserById,getUserById,createService,updateUserById,deleteContactById}