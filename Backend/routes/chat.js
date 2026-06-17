import express from "express";
import Thread from "../models/Thread.js";
import wrapAsync from "../utils/wrapAsync.js";
import  {getAllThreads, getThread, deleteThread, sendChat ,deleteAllThreads} from "../controllers/Thread.js";
import {signup,login,userVerification} from "../controllers/AuthController.js";
import { userVerify } from "../AuthMiddleware.js";

const router = express.Router();

/* Chat Routes*/
router
    .route("/")
        .post(wrapAsync(userVerification));
router
    .route("/thread")
        .get(userVerify,wrapAsync(getAllThreads))
        .delete(wrapAsync(deleteAllThreads));

router
    .route("/thread/:id")
        .get(wrapAsync(getThread))
        .delete(wrapAsync(deleteThread));
        
router
    .route("/chat")
        .post(userVerify,wrapAsync(sendChat))


/* User Routes*/
router
    .route("/signup")
        .post(wrapAsync(signup));

router
    .route("/login")
        .post(wrapAsync(login));

router
    .use((req,res)=>{
        res.redirect("/thread");
    });

export default router;