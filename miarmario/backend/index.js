const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  // Cambia el valor predeterminado al puerto 5000

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en requests

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend de mIArmario funcionando en el puerto ' + port);
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});

// Conexión a MongoDB
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));
