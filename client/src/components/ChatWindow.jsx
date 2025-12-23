import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm the Kenmark ITan AI Assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Use relative path so it works on both localhost and deployed site
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMsg.text }),
            });

            const data = await response.json();
            const botMsg = { id: Date.now() + 1, text: data.response, isBot: true };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble retrieving information right now.", isBot: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div>
                    <h3>Kenmark Assistant</h3>
                    <span>● Online</span>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="message bot">
                        <div className="loading-dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask about our services..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={isLoading}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
