import User from "../models/User.js";
import bcrypt from "bcrypt";
import createSecretToken from '../utils/SecretToken.js';

const signup = async(req,res,next)=>{
    const {email ,username, password} = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.json({message:"User already exists"});
    }

    const user = await new User({email, password, username});

    const token = createSecretToken(user._id);

    res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false
    })

    await user.save();
    res.status(201).json({message:"User signed successfully", success:true,user});
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password) return res.json({message:"All fields are required"});

    const user = await User.findOne({email});
    if(!user) return res.json({message:"incorrect password or email"});

    const auth = await bcrypt.compare(password,user.password);
    if(!auth) return res.json({message:"Incorrect password or email"});

    const token = createSecretToken(user._id);
    res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false
    }).status(201).json({message:"User logged in Successfully",success:true})

}

export {signup,login};