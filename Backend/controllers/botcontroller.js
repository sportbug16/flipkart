
const asynchandler = require("express-async-handler");
const { runPrompt }=require("../apicalls/chatbot")
const delay = require("../delay");
const {Configuration, OpenAIApi} = require("openai");
const {context, temp} = require("../apicalls/initial");
const configuration = new Configuration({
    apiKey: "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",
});
const Users = require('../models/usermodel');
const openai = new OpenAIApi(configuration);
const limit =3500;

function splitResponse(response) {
    const categories = ["Top", "Bottom", "Footwear", "Accessories", "Makeup", "Bag"];
    let outfit = {};

    categories.forEach(category => {
        const regex = new RegExp(`${category}:(.*?)(?=${categories.find(c => response.indexOf(c) > response.indexOf(category)) || '$'})`, "s");
        const match = response.match(regex);
        if (match) {
            outfit[category] = match[1].trim();
        }
    });

    return outfit;
}
function updateCategories(outfit, updates) {
    for (const [category, content] of Object.entries(updates)) {
        outfit[category] = content;
    }
    return outfit;
}

const generate_image = async(prompt) => {
    const answer = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512"
    });
    console.log(answer.data.data[0].url);
};

const generate_outfit2=asynchandler(async(req, res)=>{
    const { chats } = req.body;
    console.log(temp);

    const user = await Users.findOne({ email: req.user.email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    console.log(user);

    const user_specific_message= `I am ${user.age} aged ${user.gender} from ${user.location}.`
    const user_specific_context = { role: 'user', content: user_specific_message};
    console.log(user_specific_message);
    console.log(user_specific_context);
    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            ...temp,
            user_specific_context,
            ...chats,
        ],
    });
    chats.push(result.data.choices[0].message);
    const component_outfit = splitResponse(result.data.choices[0].message.content);
    console.log(component_outfit);
    const imagePromises = Object.entries(component_outfit).map(async ([component, description]) => {
        const imageUrl = await generate_image(description);
        return { component, imageUrl };
    });
    let imageLinks;
    try{
        const imageResults = await Promise.all(imagePromises);
        imageLinks = {};
        imageResults.forEach(({component, imageUrl}) => {
            imageLinks[component] = imageUrl;
        });
    }catch(error){
        console.error("Error fetching images:", error);
        return res.status(500).json({error: 'Failed to generate outfit images'});
    }
    res.json({
        output: result.data.choices[0].message,
        images: imageLinks
    });
});


module.exports = {generate_outfit2}