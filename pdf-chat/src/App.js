import React from 'react';
import PdfViewer from './components/PdfViewer';
import Chat from './components/Chat';
import './App.css';

function App() {
    const pdfUrl = 'https://example.com/sample.pdf'; // Cambia esto a la URL de tu PDF
    const chatApiUrl = 'https://api.example.com/chat'; // Cambia esto a tu endpoint
    const chatApiKey = 'your-api-key';

    return (
        <div className="app">
            <div className="column pdf-viewer">
                <PdfViewer pdfUrl={pdfUrl} />
            </div>
            <div className="column chat">
                <Chat apiUrl={chatApiUrl} apiKey={chatApiKey} />
            </div>
        </div>
    );
}

export default App;
