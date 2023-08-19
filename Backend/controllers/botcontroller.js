const asynchandler = require("express-async-handler");
const { runPrompt }=require("../apicalls/chatbot")
const delay = require("../delay");


const generate_outfit=asynchandler(async(req, res)=>{
    const {message}=req.body;
    console.log(req.body);
    try {
        const limit = 3800;
        await delay(10000);
        const promise = await runPrompt(message).then();
        res.json({response: promise});
    } catch(error){
        res.status(500).json({ message: 'Error calling OpenAI API' });
    }
});
module.exports = {generate_outfit}