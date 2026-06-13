import express from "express";
import Thread from "../models/Thread.js";
import wrapAsync from "../utils/wrapAsync.js";
import  {getAllThreads, getThread, deleteThread, sendChat ,deleteAllThreads} from "../controllers/Thread.js";
import {signup,login} from "../controllers/AuthController.js";
const router = express.Router();

/* Chat Routes*/
router
    .route("/api/thread")
        .get(wrapAsync(getAllThreads))
        .delete(wrapAsync(deleteAllThreads));

router
    .route("/api/thread/:id")
        .get(wrapAsync(getThread))
        .delete(wrapAsync(deleteThread));
        
router
    .route("/api/chat")
        .post(wrapAsync(sendChat))


/* User Routes*/
router
    .route("/signup")
        .post(wrapAsync(signup));

router
    .route("/login")
        .post(wrapAsync(login));

    
router
    .use((req,res)=>{
        res.redirect("/api/thread");
    });

export default router;