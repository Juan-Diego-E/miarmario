import React from 'react'

const LogIn = () => {
    return (
        <>
            <h1>Iniciar Sesión</h1>
            <form action='login'>
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
                <div className="o">o</div>
            </form>
        </>
    )
}

export default LogIn;