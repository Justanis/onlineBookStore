import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import AdminLayout from "./components/admin-layout";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center h-screen">
                <div>
                  <h1 className="text-4xl font-bold text-red-900">
                    Welcome to the Online Book Store
                  </h1>
                  <button
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => (window.location.href = "/signup")}
                  >
                    Sign Up
                  </button>
                  <button
                    className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => (window.location.href = "/signin")}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="genres" element={<AdminGenres />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
