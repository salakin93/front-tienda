import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Chat from './components/Chat';
import PdfViewer from './components/PdfViewer';
import './styles/tailwind.css';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handlePdfUploaded = (url, id) => {
    setPdfUrl(url);
    setSessionId(id);
  };

  return (
    <div id="webcrumbs" className="w-full h-screen bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">

      <div className="w-full lg:w-1/2 bg-neutral-100 flex flex-col items-center justify-start p-8 gap-4">
        {!pdfUrl ? (
          <FileUpload onPdfUploaded={handlePdfUploaded} />
        ) : (
          <PdfViewer initialPdfUrl={pdfUrl} />
        )}

      </div>

      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-5">
        {pdfUrl && sessionId ? (
          <Chat sessionId={sessionId} />
        ) : (
          <div className="text-gray-500">Sube un documento PDF para comenzar</div>
        )}
      </div>

    </div>
  );
};

export default App;
