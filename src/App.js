import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AuthContext';

import React, { useEffect } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleVideo from './pages/SingleVideo';

import './App.scss';

function App() {

  useEffect(() => {
    document.title = "AYVID - Your Video Platform";
  }, []);

  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/videos/:id" element={<SingleVideo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
