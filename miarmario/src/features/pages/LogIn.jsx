import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/LogIn.css'

const LogIn = () => {
    return (
        <>
            {/* <button className='home-icon'>
                    <i className="fa-solid fa-house"></i>
                </button> */}
            <header>
                <Link to="/">
                    <h2 className='logo-title'>mIArmario</h2>
                </Link>
                <button className='bars'>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </button>
            </header>
            <form action='login' className='login-form'>
                <h1 className='login-title'>Iniciar Sesión</h1>
                <input
                    className='email'
                    type="email"
                    name='email'
                    placeholder='Correo'
                    required />

                <input
                    className='password'
                    type="password"
                    name='password'
                    placeholder='Contraseña'
                    required />

                <button className='primary-button' type="submit">Ingresar</button>

                <p>Probar otro método</p>
                <div className="o"><div></div> O <div></div></div>
                <div className='login-options'>
                    <button className='login-btn' type="button">
                        <i className="fa-brands fa-google"></i>
                    </button>
                    <button className='login-btn' type="button">
                        <i className="fa-brands fa-apple"></i>
                    </button>
                    <button className='login-btn' type="button">
                        <i className="fa-brands fa-facebook"></i>
                    </button>
                </div>
            </form>
        </>
    )
}

export default LogIn;