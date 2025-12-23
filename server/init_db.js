const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function initDB() {
    try {
        console.log("Connecting to MySQL server...");
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        console.log("Creating database if not exists...");
        await connection.query(`CREATE DATABASE IF NOT EXISTS kenmark_chatbot`);
        console.log("Database 'kenmark_chatbot' checked/created.");

        await connection.changeUser({ database: 'kenmark_chatbot' });

        console.log("Creating table 'chat_logs'...");
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS chat_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_message TEXT NOT NULL,
                bot_response TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createTableQuery);
        console.log("Table 'chat_logs' checked/created.");

        console.log("✅ Database setup complete.");
        await connection.end();
    } catch (error) {
        console.error("❌ Database setup failed:", error);
    }
}

initDB();
