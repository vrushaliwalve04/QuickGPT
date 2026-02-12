import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

//Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("BODY:", req.body); // 👈 ADD THIS
  try {
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "User Already Exist" });
  }
  const user = await User.create({ name, email, password });
  console.log(user);
  const token = generateToken(user._id);
  res.json({ success: true, token });
  console.log(token);
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

///Login

export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({ success: true, token });
      }
    }
    return res.json({ success: false, message: "Invalid Email or Password" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get user
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//api to get publish image
export const  getPublishImages = async(req,res) =>{
  try {
  const publishedImageMessages = await Chat.aggregate([
    {$unwind:"$messages"},
    {
      $match:{
        "messages.isImage":true,
        "messages.isPublished":true
      },
      
    },
    {
    
        $project:{
          _id:0,
          imageUrl:"messages.content",
          userName:"$userName"
        }
      
    }
  ])
  res.json({success:true ,images:publishedImageMessages.reverse()})
  
} catch (error) {
   res.json({success:false,message:error.message})
}

}