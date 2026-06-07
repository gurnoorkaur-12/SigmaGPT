import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';

import router from "./routes/chat.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/static', express.static(path.join(import.meta.dirname, '../FrontendR')));

const port = 8080;
const mongo_uri = process.env.MONGO_URI;

main()
.then(()=>{console.log("connection successfull")})
.catch(err=>{
  console.log(err);
})

async function main(){
  await mongoose.connect(mongo_uri);
  
  app.listen(port,(req,res)=>{
    console.log("app is listening to port "+port);
  })
}

app.use(router);

app.use((err,req,res,next)=>{
  let {statusCode=500 , message="Something went wrong"}= err;
  res.status(statusCode).send(message);
})

await main();