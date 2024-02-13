const asynchandler = require("express-async-handler");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const {context}=require("./initial")
const {current} = require("../controllers/usercontroller");
const openai = new OpenAIApi(configuration);

const current_convo=[];
current_convo.push(context);
const limit=3900;

const runPrompt=asynchandler(async(message, tokens_used) =>{

  // while (current_convo.length > 0 && tokens_used>limit) {
  //     current_convo.shift();
  // }

  current_convo.push({"role": "user", "content": message});

  try{
     const chat = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.7,
      max_tokens: 1939,
      top_p: 1,
      frequency_penalty: 1.27,
      presence_penalty: 0,
    });

    const chat_response=chat.data.choices[0].message.content;
    current_convo.push({"role":"assistant", "content": chat_response});
    const tokens=chat.data.usage.completion_tokens;
    return ({chat_response, tokens})
  }catch(error){
    console.error(error);
    throw new Error('An error occurred while generating response.');
  }

});
module.exports=runPrompt;