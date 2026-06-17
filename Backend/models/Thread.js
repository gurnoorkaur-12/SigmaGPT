import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    role:{
        type:String,
        enum:["user","model"],
        required:true
    },
    parts:{
        type:[{
            text:String
        }],  
    },
    timeStamp:{
        type:Date,
        default:Date.now,
        required:true
    },
})

const ThreadSchema = new Schema({
    threadId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        default:"New Chat"
    },
    history:{
        type:[MessageSchema],
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Thread = mongoose.model("Thread",ThreadSchema);
const Message = mongoose.model("Message",MessageSchema);
export default Thread;