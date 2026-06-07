import "./ChatInput.css";
import { useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "./MyContext.jsx";

export default function ChatInput(){
    const {prompt ,setPrompt, reply, setReply, loading, setLoading,
            currThreadId,setCurrThreadId, newChat, setNewChat,
        } = useContext(MyContext);
    
    const getReply = async()=>{
        const options={
            message:prompt,
            threadId:currThreadId
        }
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:8080/api/chat",options)
            setReply(res.data);
            setNewChat(false);
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    return(
        <>
            <div className="ChatInput">
                <textarea
                    onKeyDown={(event)=>(event.key == "Enter" ? getReply() : null)}
                    onChange={(event)=>setPrompt(event.target.value)} value={prompt} type="text" 
                    placeholder="Ask anything" rows={2}
                />
                <i onClick={getReply} className="fa-solid fa-paper-plane fa-lg"></i>
            </div>
            <div className="info">
                SigmaGPT can make mistakes. Check important info.
            </div>
        </>
    )
}