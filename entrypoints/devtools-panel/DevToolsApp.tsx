import React, { useEffect, useState } from "react";

const DevToolsApp = () => {
  const [storageData, setStorageData] = useState<any>(null);

  useEffect(() => {
    // Run JavaScript inside the inspected window to retrieve storage
    chrome.devtools.inspectedWindow.eval(
      `new Promise(resolve => {
        if (chrome?.storage?.local) {
            chrome.storage.local.get(null, data => resolve(JSON.stringify(data, null, 2)));
        } else {
            resolve("chrome.storage.localnot found");
        }
    })`,
      (result, isException) => {
        if (isException || result === "chrome.storage.localnot found") {
          console.error("Error retrieving storage:", isException || result);
        } else {
          console.log("Retrieved storage data:", result);
        }
      }
    );



  }, []);


  return (
    <div style={{
      backgroundColor: "blue",
      color: "white",
      fontSize: "20px",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1>React UI Loaded 🎉</h1>
      <pre style={{ textAlign: "left", fontSize: "14px", background: "black", color: "white", padding: "10px" }}>
        {storageData ? JSON.stringify(storageData, null, 2) : "Fetching storage..."}
      </pre>
    </div>
  );
};

export default DevToolsApp;
