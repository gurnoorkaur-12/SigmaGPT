import { useContext, useEffect } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext.jsx";
import axios from "axios";

export default function Chat(){
    const {currThreadId , newChat ,reply , setReply, prompt, setPrompt, loading} = useContext(MyContext);
    const getCurrThread = ()=>{
        axios
            .get(`http://localhost:8080/api/thread/${currThreadId}`)
            .then((res)=>{
                console.log(res.data);
            }).catch(err=>console.log(err));
    }

    return(
        <section className="Chat">
            {
                newChat?
                // <h1 style={{textAlign:"center",alignContent:"center",height:"100%"}}>What's on your mind today?</h1> 
                <div className="chats">
                    <div className="prompt">
                            {prompt}
                    </div>
                    {/* <div className="reply">{reply}</div> */}
                </div>:null
            }
            
        </section>
    )
}