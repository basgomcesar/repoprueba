import createSystem from './system';
import { ApiAdapter } from './ApiAdapter';

const system = createSystem();

const api = new ApiAdapter(system);
api.start(3000);
