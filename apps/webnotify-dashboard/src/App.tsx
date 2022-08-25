import React, { useEffect } from "react";
import MainPage from "./pages/main-page";

function App() {
  useEffect(() => {
    document.title = "Web Notification SaaS";
  }, []);
  return (
    <div className="overflow-auto">
      <MainPage />
    </div>
  );
}

export default App;
