import User from "../models/User.js";
import bcrypt from "bcrypt";
import createSecretToken from '../utils/SecretToken.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const signup = async(req,res,next)=>{
    const {email ,username, password} = req.body;
    if(!email || !password || !username) return res.status(400).json({message:"All fields are required"});

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(302).json({message:"User already exists"});
    }

    const user = await new User({email, password, username});

    const token = createSecretToken(user._id);

    res.cookie("token",token,{
        httpOnly:false,
        secure:true,
        sameSite:none,
    })

    await user.save();
    res.status(201).json({message:"User signed successfully", success:true,user});
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;

    if(!email || !password) return res.status(400).json({message:"All fields are required"});

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"Incorrect password or email"});

    const auth = await bcrypt.compare(password,user.password);
    if(!auth) return res.status(401).json({message:"Incorrect password or email"});

    const token = createSecretToken(user._id);
    
    res.cookie("token",token,{
        httpOnly:false,
        secure:true,
        sameSite:none,
    }).status(201).json({message:"User logged in Successfully",success:true})
    
}
const userVerification = async(req,res,next)=>{
    const token = req.cookies?.token
    if (!token) {
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false })
        } else {
        const user = await User.findById(data.id)
        if (user){
            req.user = user;
            return res.json({ status: true, user: user.username })
        } else return res.json({ status: false })
        }
    })
}
export {signup,login,userVerification};