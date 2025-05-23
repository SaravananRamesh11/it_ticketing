// import React from 'react'
// import LoginPage from './pages/LoginPage.jsx'

// function App() {
//   return (
//     <h1>Welcome to IT Ticketing System</h1>
//   )
// }

// export default App

// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import EmployeePage from './pages/EmployeePage.jsx';
import ITSupportPage from './pages/ITSupportPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import SuperuserPage from './pages/SuperuserPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/itsupport" element={<ITSupportPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/superuser" element={<SuperuserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
