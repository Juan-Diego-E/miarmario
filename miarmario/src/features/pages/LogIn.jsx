import React, { useContext, useEffect } from 'react';
import { AppContext } from '../store/AppContext';

const LogIn = () => {
    const { setIsLoading } = useContext(AppContext);
    const [counter, setCounter] = React.useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setIsLoading]);

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
                <br />
                <div className="o">------------------------ O ------------------------</div>
                <br />
                <button type="button">Ingresar con Google</button>
            </form>
        </>
    )
}

export default LogIn;