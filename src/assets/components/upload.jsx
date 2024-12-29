import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import axios from "axios";

const CsvUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isFileDropped, setIsFileDropped] = useState(false); // State to track if file is dropped

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setIsFileDropped(true); // Mark that a file was dropped
    setUploadStatus(""); // Clear previous status
  };

  const parseCSV = () => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file selected");
        return;
      }

      Papa.parse(file, {
        header: true, // Assumes the first row is the header
        skipEmptyLines: true, // Skips empty rows
        complete: (result) => {
          resolve(result.data); // Returns parsed data
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setUploadStatus("Please select a file and provide a title.");
      return;
    }

    try {
      // Parse CSV data
      const parsedData = await parseCSV();
      const username = localStorage.getItem("username");
      const formattedDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // For 12-hour clock, set to false for 24-hour clock
      });

      // Format data according to LeadSchema
      const dataToUpload = {
        title,
        name: username,
        date: formattedDate,
        data: parsedData.map((row) => ({
          first_name: row.first_name || "",
          last_name: row.last_name || "",
          email: row.email || "",
        })),
      };

      // Send the formatted data to the backend
      await axios.post("https://mira-js.onrender.com/api/upload", dataToUpload, {
        headers: { "Content-Type": "application/json" },
      });

      setUploadStatus("Upload successful!");

      // Reset states
      setTitle("");
      setFile(null);
      setIsFileDropped(false);
      
    } catch (error) {
      console.error("Error:", error);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}


    >
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px", lineHeight: "1.5" }}>
    Please upload a CSV file with the following structure: The first row should include column headers: 
    <strong>first_name</strong>, <strong>last_name</strong>, and <strong>email</strong>. Each subsequent row 
    represents a lead, where the <strong>email</strong> field is mandatory, and <strong>first_name</strong> and 
    <strong>last_name</strong> are optional. Ensure the file is properly formatted and free from duplicate rows. 
    For reference, you can view a sample file  
   <a 
      href="/sample_leads.csv" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: "#4CAF50", textDecoration: "none", fontWeight: "bold" }}
    >
  View Sample Leads
</a>

  </p>
  <ahref ></ahref>


      <h3 style={{ textAlign: "center", color: "#333" }}>Lead Set Upload</h3>
      <input
        type="text"
        placeholder="Enter title for the lead set"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <div
        {...getRootProps()}
        style={{
          border: isFileDropped ? "2px solid #4CAF50" : "2px dashed #4CAF50",
          padding: "30px",
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: isFileDropped ? "#eaf6e7" : "#f9f9f9",
          marginBottom: "20px",
          transition: "background-color 0.3s",
        }}
      >
        <input {...getInputProps()} style={{ display: "none" }} />
        <p style={{ color: "#333", fontSize: "16px" }}>
          {isFileDropped
            ? `File "${file.name}" ready for upload!`
            : "Drag and drop a CSV file here, or "}
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
            {isFileDropped ? "" : "click to select one"}
          </span>
        </p>
      </div>
      <button
        onClick={handleUpload}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Upload File
      </button>
      {uploadStatus && (
        <p style={{ textAlign: "center", color: "#555", marginTop: "15px" }}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default CsvUploader;
