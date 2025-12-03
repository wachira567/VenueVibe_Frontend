<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Register from './pages/public/Register';

import ClientDashboard from './pages/client/ClientDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
>>>>>>> Stashed changes

// Component to handle page padding
function PageWrapper({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? '' : 'pt-20'}>
      {children}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="bottom-right" />

        {/* The Navbar lives outside Routes so it's always visible (except admin maybe) */}
        <Navbar />

        <PageWrapper>
          <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
       </PageWrapper>

       {/* Footer */}
        <Footer />

        {/* Global Floating WhatsApp Button */}
        <WhatsAppFloat />

      </AuthProvider>
    </BrowserRouter>
  );
>>>>>>> Stashed changes
}

export default App
