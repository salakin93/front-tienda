import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ initialPdfUrl }) => {
  const [pdfUrl] = useState(initialPdfUrl);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: '#f0f0f0' }}>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '10%' }}>No se ha seleccionado ningún archivo PDF</p>
      )}
    </div>
  );
};

export default PdfViewer;
