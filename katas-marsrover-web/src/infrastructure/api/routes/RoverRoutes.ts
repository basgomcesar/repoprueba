import express from 'express';
import { ApiService } from '../RoverService';
import createSystem from '../System';

const roverRoutes = express.Router();

const system = createSystem();
const controller = new ApiService(system);

// Se define la ruta para ejecutar las instrucciones del rover
roverRoutes.get('/rover', (req, res) => {
  controller.handle(req, res);
});

export default roverRoutes;
