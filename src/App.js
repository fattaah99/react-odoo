import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

const App = () => {
  const [authData, setAuthData] = useState({ token: null, sessionId: null });

  const handleLoginSuccess = (token, sessionId) => {
    setAuthData({ token, sessionId });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={authData.token ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/home" element={authData.token ? <MainPage token={authData.token} sessionId={authData.sessionId} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
