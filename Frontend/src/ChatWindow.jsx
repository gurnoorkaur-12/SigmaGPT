import "./ChatWindow.css";
import ChatInput from "./ChatInput";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext ,useEffect} from "react";
import axios from "axios";
import server from '../environment.js';
import { useCookies } from 'react-cookie';
import {toast,ToastContainer} from 'react-toastify';
import { Bounce } from "react-toastify";

export default function ChatWindow(){
    const {openSidebar , setOpenSidebar, setOpenSignin , setOpenLogin,
        currUser,setCurrUser,cookies, removeCookie,loggedIn,setLoggedIn,setAllThreads,
        setNewChat,verifyCookie,setReply,setPrompt
    } = useContext(MyContext);

    const close = ()=>{
        setOpenSidebar(false);
    }
    const openSignin = ()=>{
        setOpenSignin(true);
    }
    const openLogin = ()=>{
        setOpenLogin(true);
    }

    useEffect(() => {
        let res = verifyCookie();
        if(res == null) {
            setCurrUser(null);
            setLoggedIn(false);
        }
    }, [cookies]);

    const handleLogout = () => {
        removeCookie("token");
        setCurrUser(null);
        toast.info(`User logged out`,{transition:Bounce});
        setLoggedIn(false);
        setNewChat(true);
        setReply(null);
        setPrompt("");
    };
    return(
        <section className="ChatWindow" onClick={close}>
            <section className="navChats">
                <div className="navbar">
                    <p>SigmaGPT</p>
                    <div className="authBtns">
                        {
                            currUser? 
                            <button onClick={handleLogout}>
                                LOG OUT
                            </button>:
                            <>
                                <button onClick={openSignin}>SIGN IN</button>
                                <button onClick={openLogin}>LOGIN</button>
                            </>
                        }
                    </div>
                </div>
                <Chat/>
            </section>
            <ChatInput/> 
        </section>
    )
}