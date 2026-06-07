import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import  {getAllThreads, getThread, deleteThread, sendChat ,deleteAllThreads} from "../controllers/Thread.js";

const router = express.Router();

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

// router 
//     .route("/api/test")
//         .post(async(req,res)=>{    
//             try{
//                 const thread = new Thread({
//                     title:"Explain Java",
//                     threadId:'jkwebc'
//                 })
//                 thread.save();
//                 res.send(thread);
//             }catch(err){
//                 console.log(err);
//                 res.status(500).json({err : "Failed to display all Threads"});
//             }
//         })

router
    .use((req,res)=>{
        res.redirect("/api/thread");
    });

export default router;