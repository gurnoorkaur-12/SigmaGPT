import Thread from "../models/Thread.js";
import getAPIResponse from "../utils/gemini.js";

const getAllThreads = async(req,res)=>{
    const threads = await Thread.find({});
    res.send(threads);
}

const getThread = async(req,res)=>{
    let {id} = req.params;
    const thread = await Thread.findOne({threadId:id});
    res.send(thread);
}

const deleteThread = async(req,res)=>{
    let {id} = req.params;
    let thread = await Thread.findOneAndDelete({threadId:id});
    res.send(thread);
}

const sendChat = async(req,res)=>{
    let {message,threadId} = req.body;
    
    if(!threadId || !message){
        return res.status(400).json({error:"Error occurred"});
    }
    let thread = await Thread.findOne({threadId:threadId});
    if(thread){
        const response = await getAPIResponse(message,thread.history);
        res.send(response);
    }else{
        const response = await getAPIResponse(message)
        res.send(response);
    }
}

const deleteAllThreads = async(req,res)=>{
    let {id} = req.params;
    let thread = await Thread.deleteMany({});
    res.send(thread);
}

export {getAllThreads, getThread, deleteThread, sendChat, deleteAllThreads};