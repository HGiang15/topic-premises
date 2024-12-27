import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import './App.css'

function App() {
    return (
        <div className="App">
            <Header />
            <div className="app-container">
                <AppRoutes />
            </div>
            <Footer />
        </div>
    );
}

export default App;
