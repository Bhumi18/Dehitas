import React from "react";
import "./feed.css";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */
function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  return (
    <div className="upload-box">
      <input className="upload-btn" type="file" onChange={handleUpload} />
      <p>{file.name}</p>
    </div>
  );
}

export default function Upload() {
  return <FileUpload />;
}
