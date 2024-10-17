import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import injectContext from './store/AppContext.js';

// Lazy loading para las páginas
const Home = React.lazy(() => import('./pages/Home.jsx'));
const LogIn = React.lazy(() => import('./pages/LogIn.jsx'));
const Register = React.lazy(() => import('./pages/Register.jsx'));
const Profile = React.lazy(() => import('./pages/Profile.jsx'));

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Maneja el cambio de estado de conexión
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Limpia los listeners cuando el componente se desmonta
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOnline) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Sin conexión a internet</h1>
                <p>Por favor revisa tu conexión y vuelve a intentarlo.</p>
            </div>
        );
    }

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Navbar />

            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/:id" element={<Profile />} />
                    <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
                </Routes>
            </Suspense>

            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Layout);
