import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar"; // Import Navbar

const App = () => {
  const [authData, setAuthData] = useState({ token: null, sessionId: null, name: null });

  useEffect(() => {
    const token = Cookies.get("token");
    const sessionId = Cookies.get("sessionId");
    const tokenExpires = Cookies.get("tokenExpires");

    if (token && sessionId && tokenExpires) {
      if (new Date().getTime() > parseInt(tokenExpires)) {
        console.log("Token has expired");
        Cookies.remove("token");
        Cookies.remove("sessionId");
        Cookies.remove("tokenExpires");
      } else {
        const name = Cookies.get("name"); // Get name from cookies
        setAuthData({ token, sessionId, name });
      }
    }

    // Check token expiry every second
    const intervalId = setInterval(() => {
      const tokenExpires = Cookies.get("tokenExpires");
      if (tokenExpires && new Date().getTime() > parseInt(tokenExpires)) {
        console.log("Token has expired during interval check");
        Cookies.remove("token");
        Cookies.remove("sessionId");
        Cookies.remove("tokenExpires");
        setAuthData({ token: null, sessionId: null, name: null });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLoginSuccess = (token, sessionId, name) => {
    const expires = new Date(new Date().getTime() + 1 * 60 * 1000); // 1 minute
    console.log("Setting cookies with expiration:", { expires });
    Cookies.set("token", token, { expires });
    Cookies.set("sessionId", sessionId, { expires });
    Cookies.set("tokenExpires", expires.getTime().toString());
    Cookies.set("name", name); // Set name in cookies
    setAuthData({ token, sessionId, name });
  };

  console.log("Auth Data:", authData); // Log to verify

  return (
    <Router>
      {authData.token && <Navbar name={authData.name} />} {/* Display Navbar only if authenticated */}
      <Routes>
        <Route path="/login" element={authData.token ? <Navigate to="/home" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/home" element={authData.token ? <MainPage token={authData.token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
