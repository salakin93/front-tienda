import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = ({ apiUrl, apiKey }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleSend = async () => {
        if (userInput.trim() === '') return;

        const userMessage = { role: 'user', content: userInput };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post(apiUrl, {
                question: userInput,
                sessionId: 'chat-session-id',
            }, {
                headers: { 'x-api-key': apiKey }
            });

            const botMessage = { role: 'bot', content: response.data };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'bot', content: 'Error fetching response' };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setUserInput('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;