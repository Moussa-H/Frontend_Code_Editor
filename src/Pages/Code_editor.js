import React, { useState } from "react";
import Header from "../Common/Header";
import Editor from "@monaco-editor/react";
import "../Styles/Code_editor.css";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import { getToken } from "../Functions/Auth";

export default function Code_editor() {
  const [editorValue, setEditorValue] = useState(
    "# Write your Python code here"
  );
  const [output, setOutput] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const getAISuggestion = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // Correct endpoint for chat models
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: editorValue },
          ],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Access the API key from environment variables
          },
        }
      );
      return response.data.choices[0].message.content.trim(); // Access the content from the message
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("General error:", error.message);
      }
      return "Error fetching AI suggestion";
    }
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const runCode = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/codes/compile",
        { code: editorValue },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.data.status === "error") {
        setOutput(`Error: ${response.data.details}`);
      } else {
        setOutput(response.data.output);
      }

      const suggestionResult = await getAISuggestion();
      setSuggestion(suggestionResult);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const saveCode = async () => {
    try {
      await axios.post("/save-python", { code: editorValue });
      alert("Code saved successfully!");
    } catch (error) {
      alert(`Error saving code: ${error.message}`);
    }
  };

  const handleClear = () => {
    setOutput("");
  };

  const downloadFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const handleDownload = () => {
    downloadFile(editorValue, "main.py", "text/x-python");
  };

  return (
    <>
      <Header />
      <div className="code-editor">
        <div className="editor-wrapper">
          <div className="editor-desktop-top-bar">
            <div className="file-name">main.py</div>
            <div className="desktop-top-bar__btn-wrapper">
              <button
                className="share-button"
                title="Share code"
                onClick={saveCode}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="toggle-expanded-mode-mobile-icon svg share-icon replaced-svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5 6C14.7426 6 15.75 4.99264 15.75 3.75C15.75 2.50736 14.7426 1.5 13.5 1.5C12.2574 1.5 11.25 2.50736 11.25 3.75C11.25 4.99264 12.2574 6 13.5 6Z"
                    stroke="white"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 11.25C5.74264 11.25 6.75 10.2426 6.75 9C6.75 7.75736 5.74264 6.75 4.5 6.75C3.25736 6.75 2.25 7.75736 2.25 9C2.25 10.2426 3.25736 11.25 4.5 11.25Z"
                    stroke="white"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.5 16.5C14.7426 16.5 15.75 15.4926 15.75 14.25C15.75 13.0074 14.7426 12 13.5 12C12.2574 12 11.25 13.0074 11.25 14.25C11.25 15.4926 12.2574 16.5 13.5 16.5Z"
                    stroke="white"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.44336 10.1328L11.5659 13.1178"
                    stroke="white"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5584 4.88281L6.44336 7.86781"
                    stroke="white"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                Share
              </button>
              <FaDownload
                className="downloadbtn"
                title="download code"
                onClick={handleDownload}
              />
              <button className="desktop-run-button run" onClick={runCode}>
                <span className="run-text"> &nbsp;Run&nbsp; </span>
              </button>
            </div>
          </div>

          <Editor
            height="90%"
            defaultLanguage="python"
            value={editorValue}
            theme="vs-white"
            background="#f5f5f5"
            onChange={handleEditorChange}
          />
        </div>

        <div className="output-wrapper">
          <div className="terminal-desktop-top-bar">
            <div className="shell-name"></div>
            <div className="terminal-desktop-top-bar__btn-wrapper">
              <button className="desktop-clear-button" onClick={handleClear}>
                &nbsp;Clear&nbsp;
              </button>
            </div>
          </div>

          <pre>{output}</pre>
          {suggestion && (
            <div className="suggestion">
              <h3>AI Suggestion</h3>
              <pre>{suggestion}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
