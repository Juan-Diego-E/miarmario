const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/users', userRoutes);
app.use('/items', itemRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend de mIArmario funcionando');
});

// Escuchar el servidor
app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
