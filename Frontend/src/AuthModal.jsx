import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { alignContent, display, flexDirection, height, justifyContent, minWidth, padding, width } from '@mui/system';
import './AuthModal.css';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './MyContext';
import notify from './App.jsx';
import axios from 'axios';
import {toast,Bounce } from 'react-toastify';
import server from '../environment.js';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "max-content",
  minWidth:'40%',
  textAlign:"center",
  color:"white",
  height:"max-content",
  background: "black",
  color:"white",
  border: '2px solid #ffffff',
  boxShadow: "-1px 2px 14px 0px #181818",
  borderRadius:"1rem",
  p: 4,
};


export default function AuthModal({open,setOpen,title}) {
  const handleClose = () => setOpen(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {loggedIn,setLoggedIn,setNewChat,setAllThreads} = useContext(MyContext);

  let handleAuth = async(event)=>{
    event.preventDefault();
    try{
      let res;
      if(title === 'LOGIN'){
        const options={
          email,
          password
        }
        res = await axios.post(`${server}/api/v1/login`,options,{ withCredentials: true });

      }else {
        const options={
          username,
          email,
          password
        }
        res = await axios.post(`${server}/api/v1/signup`,options,{ withCredentials: true });
        if(res) res = await axios.post(`${server}/api/v1/login`,options,{ withCredentials: true });
      }
      if(res) {
        setNewChat(true);
        setAllThreads([]);
        setLoggedIn(true);
      }
    }catch(err){
      console.log(err);
      let message = err?.response?.data?.message;
      console.log(message);
      toast.error(message || 'Something went wrong', {
        transition: Bounce,
      });
    }
    setOpen(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }


  useEffect(()=>{
    setUsername("");
    setPassword("");
    setEmail("");

  },[open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 800,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2>
              {title}
            </h2>    
              <div className='authForm'>
                <form action="/" method='POST' >
                  {
                    title==="SIGN IN" ? 
                    <input
                        type="text"
                        name='username'
                        value={username}
                        placeholder='Enter Username'
                        onChange={(e)=>setUsername(e.target.value)}
                    />:null
                  }
                  <input 
                    type="email"
                    name='email' 
                    value={email} 
                    placeholder='Enter email'
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name="password" 
                    value={password}
                    placeholder='Enter Password' 
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button type='submit' onClick={handleAuth}>{title}</button>
                </form>
              </div>
              {
                title === 'REGISTER' ?
                <div className='switchAuthBtn'>
                  <h5>Already have an account? </h5>
                  <button>LOGIN</button>
                </div>
                :
                <div className='switchAuthBtn'>
                  <h5>
                    New to SIGMAGPT? 
                  </h5>
                  <button>
                    REGISTER
                    <i className="fa-solid fa-user-plus ms-2" ></i>
                  </button>
                </div>
              }
          </Box>
          </Fade>
      </Modal>
    </div>
  );
}
