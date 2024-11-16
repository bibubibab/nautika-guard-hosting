// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'; // Pastikan SignUp sudah diimpor
import AdminPage from './component/SidebarAdmin';
import UserPage from './component/Sidebar';

function AppContent() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? (isAdmin ? "/SidebarAdmin" : "/Sidebar") : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Tambahkan route untuk SignUp */}
        <Route path="/SidebarAdmin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/Sidebar" element={isAuthenticated && !isAdmin ? <UserPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
