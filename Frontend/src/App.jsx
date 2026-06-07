import { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import {MyContext} from './MyContext.jsx';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [allThreads,setAllThreads] = useState([]);
  const [prompt,setPrompt] = useState(" rvhjbqvetwibtsebtwbiptwbtbwiptwbtpuwnbptnwpbntpwbtuiwtbwutwpbtnmtjwivtpwvhtuwbvtwbvtwbtwpubutibwpitwbtpiwb");
  const [reply,setReply] = useState(null);
  const [currThreadId,setCurrThreadId] = useState(uuidv4());
  const [newChat,setNewChat] = useState(true);
  const [loading, setLoading] = useState(false);

  const values = {
    allThreads,setAllThreads,
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    newChat,setNewChat,
    loading,setLoading
  }
  return (
    <>
      <MyContext value={values}>
        <Sidebar/>
        <ChatWindow/>
      </MyContext>
    </>
  )
}

export default App
