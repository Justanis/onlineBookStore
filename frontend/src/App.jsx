import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/signup";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-4xl font-bold text-red-900">Welcome to the Online Book Store</h1>
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => window.location.href = "/signup"}
              >
                Sign Up
              </button>
            </div>
          } />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
