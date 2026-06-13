import "./ChatInput.css";
import { useContext,useEffect,useRef } from "react";
import axios from "axios";
import { MyContext } from "./MyContext.jsx";
import server from "../environment.js";

export default function ChatInput(){
    const {
        prompt ,setPrompt, reply, setReply, loading, setLoading,
        currThreadId,setCurrThreadId, newChat, setNewChat,prevChats,
        setPrevChats
    } = useContext(MyContext);

    let hasTriggered = useRef(false);

    if(hasTriggered.current == false && prompt != ""){
        hasTriggered.current = true;
    }else if(prompt == "" && hasTriggered.current==true){
        hasTriggered.current = false;
    }

    const getReply = async()=>{
        const options={
            message:prompt,
            threadId:currThreadId
        }
        setLoading(true);
        try{
            const res = await axios.post(`${server}/api/chat`,options)
            setReply(res.data);
            setNewChat(false);
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(prompt && reply){
            setPrevChats((prevChats)=>(
                [
                    ...prevChats,
                    {
                        role:"user",
                        parts:[{text:prompt}]
                    },
                    {
                        role:"model",
                        parts:[{text:reply}]
                    }
                ]
            ));

        setPrompt("");
        }
    },[reply]);
    return(
        <>
            <div className="ChatInput" style={hasTriggered.current ? {marginTop:"1rem"}:null}>
                <div className="input">
                    <textarea
                        onKeyDown={(event)=>(event.key == "Enter" ? getReply() : null)}
                        onChange={(event)=>setPrompt(event.target.value)} value={prompt} type="text" 
                        placeholder="Ask anything" rows={hasTriggered.current ? 4 : 2}
                    />
                    <i onClick={getReply} className="fa-solid fa-paper-plane fa-lg"></i>
                </div>
                <div className="info">
                    SigmaGPT can make mistakes. Check important info.
                </div>
            </div>
        </>
    )
}