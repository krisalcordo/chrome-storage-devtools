import React, { useEffect, useState } from "react";

const DevToolsApp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("✅ useEffect triggered inside DevToolsApp");

    // Automatically increase count every 2 seconds to test re-renders
    const interval = setInterval(() => {
      setCount(prev => {
        console.log(`Counter updated: ${prev + 1}`); // ✅ Log using correct prev value
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval); // Cleanup when unmounting
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
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
};

export default DevToolsApp;
