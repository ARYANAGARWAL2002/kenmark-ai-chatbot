const express = require('express');
const router = express.Router();

const { searchKnowledge } = require('../services/knowledgeService');
const { generateResponse } = require('../services/aiService');
const db = require('../config/db');

router.post('/', async (req, res) => {
    const { message } = req.body;
    try {
        // 1. Retrieve relevant context
        console.log(`[ChatAPI] Received message: "${message}"`);
        const context = searchKnowledge(message);
        console.log(`[ChatAPI] Found ${context.length} relevant context items.`);

        // 2. Generate AI response
        const aiResponse = await generateResponse(message, context);

        // 3. Log to Database (optional, fire and forget)
        // 3. Log to Database (optional, fire and forget)
        // db.query('INSERT INTO chat_logs (user_message, bot_response) VALUES (?, ?)', [message, aiResponse])
        //     .catch(err => console.error("DB Log Error:", err));

        res.json({ response: aiResponse, sources: context.map(c => c.source) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
