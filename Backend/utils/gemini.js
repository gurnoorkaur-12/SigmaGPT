import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey:process.env.API_KEY});

async function getAPIRespone(message,history) {

  if(history){

    history = history.map((msg)=>({
      role:msg.role,
      parts:msg.parts.map((chat)=>({text:chat.text})),
    }))
    
  }
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: history || []
    })

    const response = await chat.sendMessage({
      message: message,
    });

    return response.candidates[0].content.parts[0].text;
}

export default getAPIRespone;