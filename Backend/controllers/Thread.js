import Thread from "../models/Thread.js";
import getAPIResponse from "../utils/gemini.js";

const getAllThreads = async(req,res)=>{
    const threads = await Thread.find({}).sort({updatedAt:-1});
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

    let response;
    if(thread){
        response = await getAPIResponse(message,thread.history);
    }else{
        response = await getAPIResponse(message);

        const title = message.split(" ").slice(0,30).join(" ");
        thread = await new Thread({
            threadId,
            title
        })
    }
    thread.history.push(
        {
            role:"user",
            parts:[{text:message}],
        },
        {
            role:"model",
            parts:[{text:response}],
        }
    )

    thread.updatedAt = Date.now();
    await thread.save();
    res.send(response);
}

const deleteAllThreads = async(req,res)=>{
    let {id} = req.params;
    let thread = await Thread.deleteMany({});
    res.send(thread);
}

export {getAllThreads, getThread, deleteThread, sendChat, deleteAllThreads};