import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [store, setStore] = useState({
        user: null,
        isAuthenticated: false,
        items: [],
        outfits: [],
        loading: false,
        error: null,
    });

    const [actions] = useState({
        login: (userData) => {
            setStore(prevStore => ({
                ...prevStore,
                user: userData,
                isAuthenticated: true
            }));
        },
        logout: () => {
            setStore(prevStore => ({
                ...prevStore,
                user: null,
                isAuthenticated: false
            }));
        },
        fetchItems: async () => {
            try {
                setStore(prevStore => ({ ...prevStore, loading: true }));
                // Aquí iría la lógica de llamada a API para obtener los items
                const response = await fetch('/api/items');
                const data = await response.json();
                setStore(prevStore => ({
                    ...prevStore,
                    items: data,
                    loading: false
                }));
            } catch (error) {
                setStore(prevStore => ({
                    ...prevStore,
                    loading: false,
                    error: 'Error al cargar los items'
                }));
            }
        },
        fetchOutfits: async () => {
            try {
                setStore(prevStore => ({ ...prevStore, loading: true }));
                // Aquí iría la lógica de llamada a API para obtener los outfits
                const response = await fetch('/api/outfits');
                const data = await response.json();
                setStore(prevStore => ({
                    ...prevStore,
                    outfits: data,
                    loading: false
                }));
            } catch (error) {
                setStore(prevStore => ({
                    ...prevStore,
                    loading: false,
                    error: 'Error al cargar los outfits'
                }));
            }
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Efecto para verificar si el usuario ya está autenticado al cargar la app
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setStore(prevStore => ({
                ...prevStore,
                user: storedUser,
                isAuthenticated: true
            }));
        }
    }, []);

    return (
        <AppContext.Provider value={{ store, actions, isLoading, setIsLoading }}>
            {isLoading && <Loader />}
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AppContext, AppProvider };

// Función de inyección de contexto para usar en componentes
const injectContext = (PassedComponent) => {
    const InheritedComponent = (props) => {
        return (
            <AppProvider>
                <PassedComponent {...props} />
            </AppProvider>
        );
    };
    return InheritedComponent;
};

export default injectContext;
