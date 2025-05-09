import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import Login from './pages/login';
import SignUp from './pages/SignUp'; // Import SignUp page

const App = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/signup" element={<SignUp />} /> {/* SignUp page */}
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
          </Routes>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
};

export default App;