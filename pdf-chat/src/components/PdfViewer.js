import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ initialPdfUrl }) => {
    const [pdfUrl, setPdfUrl] = useState(initialPdfUrl);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8082/api/pdf/upload-pdf', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Upload result:', result);

                // Assuming the API returns a `pdfUrl` property with the new PDF's URL
                if (result && result.pdfUrl) {
                    setPdfUrl(result.pdfUrl);
                } else {
                    alert('Error: No PDF URL returned from server.');
                }
            } else {
                alert('Error uploading file: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. See console for details.');
        }
    };

    return (
        <div style={{ height: '100%', width: '100%', position: 'relative', backgroundColor: '#f0f0f0' }}>
            {/* Botón de carga */}
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                <input
                    type="file"
                    accept="application/pdf"
                    id="file-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="file-upload"
                    style={{
                        cursor: 'pointer',
                        padding: '8px 16px',
                        background: '#007BFF',
                        color: '#FFF',
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}
                >
                    Subir Archivo
                </label>
            </div>

            {/* Visor de PDF */}
            {pdfUrl ? (
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfUrl} />
                </Worker>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20%' }}>No se ha seleccionado ningún archivo PDF</p>
            )}
        </div>
    );
};

export default PdfViewer;
