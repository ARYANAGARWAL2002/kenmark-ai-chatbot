const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loaded first to ensure variables are available
const chatRoutes = require('./routes/chat');

// ADD THIS LINE: Import the loader from your service
const { loadKnowledgeBase } = require('./services/knowledgeService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// INITIALIZE THE DATA: Call the loader so the chatbot has information to search
loadKnowledgeBase();

// Routes
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
    res.send('Kenmark ITan Chatbot API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});