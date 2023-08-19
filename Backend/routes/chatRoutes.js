const express = require('express');
const { generate_outfit } = require('../controllers/botcontroller');

const router = express.Router();

router.post('/chat', generate_outfit);

module.exports = router;