import User from "./models/User.js";
import jwt from 'jsonwebtoken';

const userVerify = async(req,res,next)=>{
    try{
        const token = req.cookies?.token
        if (!token) {
            return next();
        }
        const data = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(data.id);
        if (user) {
            req.user = user;
        }
        next();
    } catch (err) {
        next(err);
    }
}
export {userVerify};