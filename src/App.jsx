import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import VenueList from './pages/public/VenueList';
import VenueDetails from './pages/public/VenueDetails';
import Login from './pages/public/Login';

import ClientDashboard from './pages/client/ClientDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="bottom-right" />
        
        {/* The Navbar lives outside Routes so it's always visible (except admin maybe) */}
        <Navbar />
        
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />

          {/* CLIENT ROUTES (User Only) */}
          <Route element={<ProtectedRoute allowedRoles={['Client', 'Admin']} />}>
             <Route path="/dashboard" element={<ClientDashboard />} />
             {/* Add /invoices here later */}
          </Route>

          {/* GOD MODE (Admin Only) */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
             <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Global Floating WhatsApp Button */}
        <WhatsAppFloat />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
