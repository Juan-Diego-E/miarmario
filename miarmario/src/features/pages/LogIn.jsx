import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/LogIn.css'

const LogIn = () => {
    return (
        <>
            <Link to="/">
                <button className='home-icon'>
                    <i className="fa-solid fa-house"></i>
                </button>
            </Link>
            <h1 className='login-title'>Iniciar Sesión</h1>
            <form action='login' className='login-form'>
                <input
                    type="email"
                    name='email'
                    placeholder='Tu Correo...'
                    required />

                <input
                    type="password"
                    name='password'
                    placeholder='Contraseña...'
                    required />

                <button type="submit">Ingresar</button>

                <p>Probar otro método</p>
                <div className="o">------------------------ O ------------------------</div>
                <button type="button">Ingresar con Google</button>
            </form>
        </>
    )
}

export default LogIn;