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

const path = require('path');

// ... existing code ...

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.use('/api/chat', chatRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});