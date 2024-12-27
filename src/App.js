import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import Filter from "./components/Filter/Filter";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="app-container">
                <Filter />
                <AppRoutes />
            </div>
            <Footer />
        </div>
    );
}

export default App;
