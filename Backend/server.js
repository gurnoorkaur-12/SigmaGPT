import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser";
import router from "./routes/chat.js"

const app = express();
app.use(express.json());
app.set("trust proxy", 1); 

app.use(express.urlencoded({extended:true}));
app.use(cors(
  { origin:"https://sigmagpt-frontend-1odj.onrender.com",
    methods:['GET','POST','DELETE','PUT'],
    credentials:true,
  }
));
app.use(cookieParser());
app.use('/static', express.static(path.join(import.meta.dirname, '../Frontend')));

const port = 8080;
const mongo_uri = process.env.MONGO_URI;

main()
.then(()=>{console.log("connection successfull")})
.catch(err=>{
  console.log(err);
})

async function main(){
  await mongoose.connect(mongo_uri);
}

app.listen(port,(req,res)=>{
  console.log("app is listening to port "+port);
})

app.use("/api/v1",router);

app.use((err,req,res,next)=>{
  console.log(err);
  let {statusCode=500 , message="Something went wrong"}= err;
  res.status(statusCode).send(message);
})
