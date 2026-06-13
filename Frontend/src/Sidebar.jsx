import "./Sidebar.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import {MyContext} from "./MyContext";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar({style}){
  const {
    allThreads , setAllThreads,currThreadId,  setCurrThreadId, newChat, setNewChat, reply, setReply
    ,prompt, setPrompt,prevChats, setPrevChats,openSidebar,setOpenSidebar
  } = useContext(MyContext);
  
  const getAllThreads = async()=>{
    const res = await axios.get("http://localhost:8080/api/thread")
      try{
        setAllThreads(
          res.data.map((thread)=>(
            {
              threadId:thread.threadId,
              title:thread.title
            }
          ))
        )
      }catch(e){
        console.log(e);
      }
  }
  
  useEffect(()=>{
    getAllThreads();
  },[allThreads])


  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  }

  const deleteThread = async(id)=>{
    try{
      const res = await axios.delete(`http://localhost:8080/api/thread/${id}`);
      if(currThreadId == res.data.threadId){
        createNewChat();
      }
    }catch(err){
      console.log(err);
    }
  }

  const changeThread = async(id)=>{
      setCurrThreadId(id);
      const thread= await axios.get(`http://localhost:8080/api/thread/${id}`);
      setNewChat(false);
      setPrevChats(thread.data.history);
      setPrompt("");
      setReply(null);
  }

  return(
    <section className="Sidebar" style={openSidebar ? {transform: "translateX(0)" , zIndex:"10",width:"30%"}:null}>
      <button onClick={createNewChat} className="newChat">
        <img src="./src/assets/logo.png" alt="SigmaGPT logo" className="logo"/>
        <i className="fa-solid fa-pen-to-square fa-lg"></i>
      </button>
      <div className="recents">
        <ul className="history">
          {
            allThreads?.map((thread)=>(
              <li key={thread.threadId} 
                style={currThreadId === thread.threadId ?{backgroundColor:"#2b2b2b"}:null}
              >
                <p onClick={()=>changeThread(thread.threadId)}>{thread.title}</p>
                <div onClick={()=>deleteThread(thread.threadId)}>
                  <i className="fa-solid fa-trash-can fa-sm" style={{color:"rgb(255, 255, 255)",marginLeft:"15px"}}></i>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="user">
       Username
      </div>
    </section>
  )
}