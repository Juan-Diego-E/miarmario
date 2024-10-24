import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/LogIn.css';
import ThemeSwitcher from '../components/ThemeSwitcher.jsx';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const Soon = () => {
        window.alert('Proximamente...')
    }

    return (
        <>
            <header>
                <Link to="/">
                    <h2 className='logo-title'>mIArmario</h2>
                </Link>
                <ThemeSwitcher />
            </header>
            <form action='login' className='login-form'>
                <h1 className='login-title'>Iniciar Sesión</h1>

                <input
                    className='email'
                    type="email"
                    name='email'
                    placeholder='Correo'
                    required
                />

                <div className='password-container'>
                    <input
                        className='password'
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Contraseña'
                        minLength='6'
                        required
                    />
                    <p className='password-alert'>La contraseña debe tener al menos 6 caracteres</p>
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                            <i className="fa-solid fa-eye"></i>
                        )}
                    </button>
                </div>

                <button className='primary-button' type="submit">Ingresar</button>

                <div className='register-link'>
                    <span>
                        ¿Es tu primera vez por aquí?
                    </span>
                    <Link to='/register'>
                        Registrarme
                    </Link>
                </div>
                <div className="o"><div></div> O <div></div></div>
                <p>Probar otro método</p>
                <div className='login-options'>
                    <button onClick={(e) => Soon()} className='login-btn' type="button">
                        <i className="fa-brands fa-google"></i>
                    </button>
                    <button onClick={(e) => Soon()} className='login-btn' type="button">
                        <i className="fa-brands fa-apple"></i>
                    </button>
                    <button onClick={(e) => Soon()} className='login-btn' type="button">
                        <i className="fa-brands fa-facebook"></i>
                    </button>
                </div>
            </form>
        </>
    );
};

export default LogIn;
