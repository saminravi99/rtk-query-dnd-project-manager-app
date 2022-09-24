import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";

function App() {
  const authChecked = useAuthCheck();
  const auth = useSelector((state) => state.auth);
  const { accessToken } = auth || {};

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        {accessToken && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <PrivateRoute>
                <Teams />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                  <Projects />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
