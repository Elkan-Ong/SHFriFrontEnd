import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid JPG image.');
    }
  };

  // Submit the file to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('https://your-backend-endpoint/api/upload', { // Replace with your actual API
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred during upload.');
    }
  };

  return (
      <div className="App">
        <h1>Upload JPG Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/jpeg" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
  );
}

export default App;