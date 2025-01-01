import React from "react";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
    return (
        <div className="App">
            <AppRoutes />
            <Chatbot />
        </div>
    );
}

export default App;
