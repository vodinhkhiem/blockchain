import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './pages.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard.jsx';
import Verify from './pages/Verify.jsx';
import MyCredentials from './pages/MyCredentials.jsx';
import Institutions from './pages/Institutions.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="verify" element={<Verify />} />
          <Route path="my-credentials" element={<MyCredentials />} />
          <Route path="institutions" element={<Institutions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;