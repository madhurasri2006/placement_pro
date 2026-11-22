
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <header className="navbar">
          <div className="brand">
           
            <div>
              <h2>PlacementPro</h2>
              <p>Student Skills Management</p>
            </div>
          </div>

          
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>PlacementPro · Student Skills Management System</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
