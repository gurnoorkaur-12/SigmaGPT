import "./Sidebar.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import {MyContext} from "./MyContext";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar(){
  const {
    allThreads , setAllThreads,currThreadId,  setCurrThreadId, newChat, setNewChat, reply, setReply
    ,prompt, setPrompt
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

  const changeThread = (id)=>{
    axios
      .get(`http://localhost:8080/api/thread/${id}`)
        .then((res)=>{
          setCurrThreadId(id);
        }).catch((err)=>console.log(err));
  }

  return(
    <section className="Sidebar" >
      <button onClick={createNewChat} className="newChat">
        <img src="./src/assets/logo.png" alt="SigmaGPT logo" className="logo"/>
        <i className="fa-solid fa-pen-to-square fa-lg"></i>
      </button>
      <div className="recents">
        <ul className="history">
          {
            allThreads?.map((thread)=>(
              <li key={thread.threadId} onClick={()=>changeThread(thread.threadId)} style={{display:"flex" , justifyContent:"space-between" , alignContent:"center"}}>
                {thread.title}
                <div>
                  <i onClick={()=>{deleteThread(thread.threadId)}} className="fa-solid fa-trash-can fa-xs" style={{color:"rgb(255, 255, 255)"}}></i>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="user">
        <div>
          Username
        </div>
      </div>
    </section>
  )
}