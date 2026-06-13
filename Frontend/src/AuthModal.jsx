import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { height, padding, width } from '@mui/system';
import './AuthModal.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-40%, -50%)',
  width: 400,
  textAlign:"center",
  color:"white",
  height:"max-content",
  backgroundColor: '#212121',
  border: '2px solid #ffffff',
  boxShadow: 24,
  borderRadius:"1rem",
  p: 4,
};

export default function AuthModal({open,setOpen,title}) {
  const handleClose = () => setOpen(false);

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
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight:600}}>
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className='authForm'>
                <form action="/" method='POST'>
                  {
                    title==="SIGN IN" ? 
                    <input type="text" name='username' placeholder='Enter Username'/>:null
                  }
                  <input type="email" name='email' placeholder='Enter email'/>
                  <input type="password" name="password" placeholder='Enter Password' />
                  <button type='submit'>{title}</button>
                </form>
              </div>
            </Typography>
          </Box>
          </Fade>
      </Modal>
    </div>
  );
}
