import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chat = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { role: 'user', content: userInput };
    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8082/api/pdf/query?sessionId=${sessionId}&question=${encodeURIComponent(
          userInput
        )}`
      );

      const botMessage = { role: 'bot', content: response.data.content };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { role: 'bot', content: 'Error al obtener respuesta' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
    setUserInput('');
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-0 p-5 overflow-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 max-w-[80%] rounded-lg ${msg.role === 'user'
                ? 'bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg'
                : 'bg-gray-300 p-3 rounded-r-lg rounded-bl-lg'
              }`}
            style={{ wordWrap: 'break-word', marginBottom: '10px' }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2 px-4 py-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder="Escribe tu consulta..."
          className="flex-grow p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
