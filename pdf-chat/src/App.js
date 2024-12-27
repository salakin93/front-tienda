import React from 'react';
import PdfViewer from './components/PdfViewer';
import Chat from './components/Chat';
import './App.css';

function App() {
    const pdfUrl = '/PDFs/inspiron-16-plus-7630-4050-3050-om-es-xl.pdf'; // Cambia esto a la URL de tu PDF
    const chatApiUrl = 'http://localhost:8082/api/pdf/query?sessionId=src_cJfyB5xvDBbsN4CnJDt4o&question='; // Cambia esto a tu endpoint
    const chatApiKey = 'your-api-key';

    return (
        <div className="app">
            <div className="column pdf-viewer">
                <PdfViewer initialPdfUrl={pdfUrl} />
            </div>
            <div className="column chat">
                <Chat apiUrl={chatApiUrl} apiKey={chatApiKey} />
            </div>
        </div>
    );
}

export default App;
