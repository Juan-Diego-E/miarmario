import React, { useContext } from 'react';
import { AppContext } from '../store/AppContext.jsx';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(AppContext);

    return (
        <button onClick={toggleTheme} className="toggle-theme-btn">
            {theme === 'light' ? (
            <i className="fa-solid fa-moon"></i>
            ) : (
                <i className="fa-solid fa-sun"></i>
            )}
        </button>
    );
};

export default ThemeSwitcher;
