import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Chatbot from "./components/Chatbot/Chatbot";
import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import "./App.css";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
            <Chatbot />
        </div>
    );
}

export default App;
