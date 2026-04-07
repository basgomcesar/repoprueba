import express from 'express';
import roverRoutes from './routes/RoverRoutes';

const app = express();

app.use(express.json());
// Importa las rutas
app.use('/', roverRoutes);

const PORT = 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export { app };
