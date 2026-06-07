import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true      
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.pre("save",async()=>{
    this.password = await bcrypt.hash(this.password,12);
})
const User = mongoose.model("User",UserSchema);
export default User;