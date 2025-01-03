import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onPdfUploaded }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMessage('');
    setError('');
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:8082/api/pdf/upload-pdf',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const pdfUrl = response.data.pdfUrl;
      const sourceId = response.data.sourceId;
      setSuccessMessage('Archivo subido exitosamente!');
      
      // Notify the parent with the PDF URL and sourceId
      onPdfUploaded(pdfUrl, sourceId); 
    } catch (err) {
      setError('Error al cargar el archivo: ' + err.message);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
      <button
        onClick={handleFileUpload}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Subir Documento PDF
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
    </div>
  );
};

export default FileUpload;
