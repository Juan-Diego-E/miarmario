import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <p>&copy; {new Date().getFullYear()} mIArmario. Todos los derechos reservados.</p>
                <nav>
                    <a href="/about" style={linkStyle}>Acerca de</a>
                    <a href="/privacy" style={linkStyle}>Privacidad</a>
                    <a href="/contact" style={linkStyle}>Contacto</a>
                </nav>
            </div>
        </footer>
    );
};

// const footerStyle: React.CSSProperties = {
//     backgroundColor: '#2c3e50',
//     color: '#ecf0f1',
//     padding: '20px 0',
//     textAlign: 'center',
//     position: 'relative',
//     bottom: '0',
//     width: '100%',
// };

// const containerStyle: React.CSSProperties = {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0 15px',
// };

// const linkStyle: React.CSSProperties = {
//     color: '#ecf0f1',
//     margin: '0 10px',
//     textDecoration: 'none',
//     fontSize: '14px',
// };

export default Footer;
