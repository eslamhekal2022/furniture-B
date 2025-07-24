import { userModel } from "../../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const register=async(req,res)=>{
    try{
    const { name, email, password, phone, image } = req.body;
    if(!name||!email||!password){
return res.status(400).json({ message: "All fields (name, email, password, phone, image) are required." });
    }
    const user=await userModel.findOne({email})
    if(user){
      return res.status(400).json({ message: 'User already registered', success: false });
    }

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'admin',
      image,
    });

    await newUser.save();
console.log(newUser)


    res.status(201).json({ message: 'User registered successfully', success: true,   user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    image: newUser.image,
  } });
    }
   catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const login =async(req,res)=>{
    
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).json({message:"i don't found the user ",success:false})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"password Don't match"})
        }
const token=jwt.sign({userId:user._id,name:user.name},process.env.JWT_SECRET)

res.status(200).json({
  message: "user access good",
  success: true,
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image || "",
  }
});
    } catch (error) {
  console.error('Login error:', error);
  res.status(500).json({ message: 'Server error', error: error.message });
}
}

export const getUsers=async(req,res)=>{
    try {
        const users=await userModel.find()
        res.status(200).json({message:"all users",success:true,data:users})
    } catch (error) {
res.status(400).json({ message: "Error while deleting user", success: false, error: error.message });
    }
}

export const deleteUser=async(req,res)=>{
try {
        const {id}=req.params
        const user=await userModel.findByIdAndDelete(id)
        if (!user) {
  return res.status(404).json({ message: "User not found", success: false });
}
        res.status(200).json({message:"good found the user and delete",success:true})
} catch (error) {
        res.status(400).json({message:"IDF THE USER ",success:false})
    
}    
}


