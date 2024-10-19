import React, { useContext, useEffect } from 'react';
import { AppContext } from '../store/AppContext.jsx';

const Home = () => {
    const { store, actions } = useContext(AppContext);

    useEffect(() => {
        // Cargar los items y outfits cuando se monte el componente
        if (store.isAuthenticated) {
            actions.fetchItems();
            actions.fetchOutfits();
        }
    }, [store.isAuthenticated]);

    return (
        <div className="home-container">
            <h1>mIArmario</h1>

            {store.isAuthenticated ? (
                <>
                    <h2>Hola, {store.user ? store.user.name : 'Usuario'}!</h2>

                    <div className="items-section">
                        <h3>Tus Prendas</h3>
                        {store.loading ? (
                            <p>Cargando prendas...</p>
                        ) : store.items.length > 0 ? (
                            <ul>
                                {store.items.map(item => (
                                    <li key={item._id}>{item.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tienes prendas guardadas aún.</p>
                        )}
                    </div>

                    <div className="outfits-section">
                        <h3>Tus Outfits</h3>
                        {store.loading ? (
                            <p>Cargando outfits...</p>
                        ) : store.outfits.length > 0 ? (
                            <ul>
                                {store.outfits.map(outfit => (
                                    <li key={outfit._id}>{outfit.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tienes outfits creados aún.</p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h2>Por favor, inicia sesión para ver tu armario y outfits.</h2>
                    <p>¡Accede para comenzar a organizar tu armario de manera eficiente!</p>
                </>
            )}
        </div>
    );
};

export default Home;
