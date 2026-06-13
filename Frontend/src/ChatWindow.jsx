import "./ChatWindow.css";
import ChatInput from "./ChatInput";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext } from "react";
import axios from "axios";


export default function ChatWindow(){
    const {openSidebar , setOpenSidebar, setOpenSignin , setOpenLogin} = useContext(MyContext);
    const close = ()=>{
        setOpenSidebar(false);
    }
    const openSignin = ()=>{
        setOpenSignin(true);
    }
    const openLogin = ()=>{
        setOpenLogin(true);
    }
    return(
        <section className="ChatWindow" onClick={close}>
            <section className="navChats">
                <div className="navbar">
                    <p>SigmaGPT</p>
                    <div className="authBtns">
                        <button onClick={openSignin}>SIGN IN</button>
                        <button onClick={openLogin}>LOGIN</button>
                    </div>
                </div>
                <Chat/>
            </section>
            <ChatInput/> 
        </section>
    )
}