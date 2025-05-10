import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/signup" element={<SignUp />} /> {/* SignUp page */}

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:movieId"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            />

            {/* Redirect all unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
};

export default App;