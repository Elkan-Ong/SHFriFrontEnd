import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(""); // Store prediction result
  const [inputText, setInputText] = useState("");
  const [percentage, setPercentage] = useState(null);

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid JPG image.");
    }
  };

  // Submit the file to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload_image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setPrediction(data.prediction); // Update state with prediction
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during upload.");
    }
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();

    if (!inputText.trim()) {
      alert("Please enter some text before submitting.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/predict_text/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }), // Send input text in the request body
      });

      if (response.ok) {
        const data = await response.json();
        setPercentage(data.prediction);
      } else {
        alert("Failed to submit text.");
      }
    } catch (error) {
      console.error("Error submitting text:", error);
      alert("An error occurred during text submission.");
    }
  };


  return (
      <div className="App">
        <h1>Upload JPG Image</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/jpeg" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {prediction && (
            <div>
              <h2>Prediction:</h2>
              <p>{prediction}</p>
            </div>
        )}
        <hr />
        <div>
          <h2>Submit Your Text</h2>
          <form onSubmit={handleTextSubmit}>
            <input
                type="text"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                placeholder="Enter text here..."
            />
            <button type="submit">Submit Text</button>
          </form>
          {percentage !== null && (
              <div>
                <h2>Percentage:</h2>
                <p>{percentage.toFixed(2) * 100}%</p>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;
