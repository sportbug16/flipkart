const express = require('express');
const { generate_outfit2 } = require('../controllers/botcontroller');
const {runPrompt} = require('../apicalls/chatbot.js');
const router = express.Router();
const validatetoken = require("../middleware/accesstokenhandler")
router.post('/chat', validatetoken, generate_outfit2);

module.exports = router;