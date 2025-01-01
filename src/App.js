import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Chatbot from "./components/Chatbot/Chatbot";
import "./App.css";

function App() {
    return (
        <div className="App">
            <AppRoutes />
            <Chatbot />
        </div>
    );
}

export default App;
