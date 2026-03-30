import createSystem from './system';
import { ApiAdapter } from './ApiAdapter';
import { ApiController } from './ApiController';

const system = createSystem();
const controller = new ApiController(system);

const api = new ApiAdapter(controller);
api.start(3000);
