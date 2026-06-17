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
        setNewChat
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
        const verifyCookie = async () => {
            if (!cookies.token) {
                return;
            }
            const { data } = await axios.post(
                "http://localhost:8080/api/v1",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setCurrUser(user);
            if(loggedIn) toast.success(`Hello ${user} :)`)
            return status
                ? null
                : (removeCookie("token"));
            };
        verifyCookie();
    }, [cookies,loggedIn]);

    const handleLogout = () => {
        removeCookie("token");
        setCurrUser(null);
        toast.info(`User logged out`,{transition:Bounce});
        setLoggedIn(false);
        setNewChat(true);
        setAllThreads([]);
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