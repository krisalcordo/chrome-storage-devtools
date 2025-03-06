import React, { useEffect, useState } from "react";

const DevToolsApp = () => {
  const [storageData, setStorageData] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState("local"); // Default to local storage

  const fetchStorage = (type) => {
    setStorageData(null); // Reset displayed data

    chrome.devtools.inspectedWindow.eval(
      `
      (function() {
        if (!chrome.storage || !chrome.storage['${type}']) return "Storage type not available";
        
        window.__chromeStorageResult = null;
        chrome.storage['${type}'].get(null, function(result) {
          window.__chromeStorageResult = result;
        });
        return "Fetching ${type} storage...";
      })();
      `,
      function (result, isException) {
        if (isException) {
          console.error("Error retrieving chrome storage:", isException);
        } else {

          // Poll for the result after a short delay
          setTimeout(() => {
            chrome.devtools.inspectedWindow.eval(
              "window.__chromeStorageResult",
              function (finalResult) {
                if (finalResult) {
                  setStorageData(finalResult); // ✅ Update state with storage data
                } else {
                  console.warn("No storage data found.");
                }
              }
            );
          }, 500);
        }
      }
    );
  };

  useEffect(() => {
    fetchStorage(selectedStorage); // Fetch storage on first load
  }, [selectedStorage]); // Re-fetch when selection changes

  return (
    <div
      style={{
        backgroundColor: "blue",
        color: "white",
        fontSize: "20px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>React UI Loaded 🎉</h1>

      {/* Dropdown for selecting storage type */}
      <label style={{ fontSize: "16px", marginBottom: "10px", display: "block" }}>
        Select Storage Type:
      </label>
      <select
        value={selectedStorage}
        onChange={(e) => setSelectedStorage(e.target.value)}
        style={{
          fontSize: "16px",
          padding: "5px",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        <option value="local">Local Storage</option>
        <option value="sync">Sync Storage</option>
        <option value="session">Session Storage</option>
      </select>

      {/* Storage Data Display */}
      <pre
        style={{
          textAlign: "left",
          fontSize: "14px",
          background: "black",
          color: "white",
          padding: "10px",
          whiteSpace: "pre-wrap",
        }}
      >
        <b>{selectedStorage.charAt(0).toUpperCase() + selectedStorage.slice(1)} Storage:</b>
        <br />
        {storageData ? JSON.stringify(storageData, null, 2) : "Fetching..."}
      </pre>
    </div>
  );
};

export default DevToolsApp;
