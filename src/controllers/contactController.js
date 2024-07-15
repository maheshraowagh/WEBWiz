import Contact from "../models/contactModels.js"

const contactForm = async(req,res,next)=>{
try {
    const response = req.body;
    // console.log(req.body)
    await  Contact.create( response)
    res.status(200).json({message:"message sent succesfully"})
} catch (error) {
    next(error)
}

}

export default contactForm