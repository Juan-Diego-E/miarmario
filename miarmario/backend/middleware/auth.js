const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Obtener el token del header
    const token = req.header('x-auth-token');

    // Si no hay token, denegar el acceso
    if (!token) {
        return res.status(401).json({ message: 'No hay token, permiso denegado' });
    }

    // Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};
