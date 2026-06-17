import { useState ,useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar.jsx';
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import Error from './Error.jsx';
import ChatWindow from './ChatWindow.jsx';
import {MyContext} from './MyContext.jsx';
import { v4 as uuidv4 } from "uuid";
import AuthModal from "./AuthModal.jsx";
import { ToastContainer, Slide } from 'react-toastify';
import { useCookies } from "react-cookie";

function App() {
  const [allThreads,setAllThreads] = useState([]);
  const [prompt,setPrompt] = useState("");
  const [reply,setReply] = useState(null);
  const [currThreadId,setCurrThreadId] = useState(uuidv4());
  const [newChat,setNewChat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [prevChats,setPrevChats] = useState([]);
  const [openSidebar,setOpenSidebar] = useState(false);
  const [openSignin,setOpenSignin] = useState(false);
  const [openLogin,setOpenLogin] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [currUser,setCurrUser] = useState(null);
  const [loggedIn,setLoggedIn] = useState(false);


  const values = {
    allThreads,setAllThreads,
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    newChat,setNewChat,
    loading,setLoading,
    prevChats,setPrevChats,
    openSidebar,setOpenSidebar,
    openLogin,setOpenLogin,
    openSignin,setOpenSignin,
    cookies, removeCookie,
    currUser,setCurrUser,
    loggedIn,setLoggedIn
  }
  
  const open = ()=>{
    setOpenSidebar(true);
  }
  return (
    <>
      <MyContext value={values}>
        <ErrorBoundary
          FallbackComponent={Error} 
          onError={(error,errorInfo)=>{
            console.log(error);
          }}
          onReset={()=>setNewChat(true)}
          >
          <div className='menu' onClick={open} style={openSidebar ? {display:"none"} :null}>
            <i className="fa-solid fa-bars fa-xl" style={{color: "rgb(255, 255, 255)"}}></i>
          </div>
          <Sidebar/>
          <ChatWindow/>
          <AuthModal open={openLogin} setOpen={setOpenLogin} title={"LOGIN"}/>
          <AuthModal open={openSignin} setOpen={setOpenSignin} title={"SIGN IN"}/>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Slide}
            />
        </ErrorBoundary>
      </MyContext>
    </>
  )
}

export default App
