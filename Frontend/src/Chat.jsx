import { useContext, useEffect ,useState} from "react";
import "./Chat.css";
import { MyContext } from "./MyContext.jsx";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Markdown from "react-markdown";
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function Chat(){
    let {currThreadId , newChat ,reply ,
        setReply, prompt, setPrompt, loading, setLoading,
        prevChats,setPrevChats
    } = useContext(MyContext);

    let [latestReply,setLatestReply] = useState(null);

    useEffect(()=>{
        if(reply){
            let content = reply.split(" ");
            let idx = 0;
            setLoading(false);
            let interval = setInterval(()=>{
                setLatestReply(content.slice(0,idx+1).join(" "));
                idx++;
                if(idx >= content.length) clearInterval(interval);
            },40) 
            return ()=>{
                setLatestReply(null)
                clearInterval(interval);
            }
        }
    },[prevChats,reply])

    return(
        <section className="Chat">            
            {
                newChat?
                <div>
                    <h1 style={{height:"8rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",marginTop:"8rem"}}>
                        What's on your mind today?
                    </h1>
                </div> : null
            }
            {
                prevChats.slice(0,-1).map((chat,idx)=>
                    <div className={chat.role === "user" ? "prompt":"reply"} key={idx}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.parts[0].text}</ReactMarkdown>
                    </div>
                )
            }
            {
                prevChats.length > 0 ?
                    latestReply === null ? (
                            <div className="reply" key={"non-typing"}>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].parts[0].text}</ReactMarkdown>
                            </div>
                        ):(
                            <div className="reply" key={"typing"}>
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                            </div>
                        )
                    : null

            }

            <ScaleLoader color={"white"} loading={loading} style={{width:"100%",display:"inline-block",textAlign:"center",marginBottom:"2rem"}}/>

        </section>
    )
}