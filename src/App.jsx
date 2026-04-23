import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import RestaurantForm from './pages/RestaurantForm';
import BookingForm from './pages/BookingForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function Layout({ children, hideFooter = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <Toast />
            <Routes>
              {/* Public */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/restaurants" element={<Layout><Restaurants /></Layout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected - User */}
              <Route path="/dashboard" element={
                <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute><Layout><Favorites /></Layout></ProtectedRoute>
              } />
              <Route path="/bookings/create" element={
                <ProtectedRoute><Layout><BookingForm /></Layout></ProtectedRoute>
              } />

              {/* Protected - Admin: static paths BEFORE dynamic :id */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly><Layout><AdminPanel /></Layout></ProtectedRoute>
              } />
              <Route path="/restaurants/create" element={
                <ProtectedRoute adminOnly><Layout><RestaurantForm /></Layout></ProtectedRoute>
              } />
              <Route path="/bookings/:id/edit" element={
                <ProtectedRoute adminOnly><Layout><BookingForm /></Layout></ProtectedRoute>
              } />
              <Route path="/restaurants/:id/edit" element={
                <ProtectedRoute adminOnly><Layout><RestaurantForm /></Layout></ProtectedRoute>
              } />

              {/* Dynamic - must come AFTER all static /restaurants/* routes */}
              <Route path="/restaurants/:id" element={<Layout><RestaurantDetail /></Layout>} />

              {/* 404 */}
              <Route path="*" element={<Layout hideFooter><NotFound /></Layout>} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
