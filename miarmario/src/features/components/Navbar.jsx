import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">mIArmario</Link> {/* Logo */}
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                    <Link to="/register">Registrarse</Link>
                </li>
                <li>
                    <Link to="/user/1">Perfil</Link> {/* Perfil ejemplo, actualizar con el id correcto */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
