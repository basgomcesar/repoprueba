import { Request, Response } from 'express';
import { InvalidInstructionError } from '../../domain/Exceptions/InvalidInstructionError';
import { RoverSystem } from 'src/application/System';



export class ApiService {
  constructor(private system: RoverSystem) {

  }
  handle(req: Request, res: Response) {
    try {
      const { execute, createRover, presenter } = this.system;
      const instructions: string[] = req.query.instructions ? (req.query.instructions as string).split('') : [];
      const rover = createRover();
      const result = execute(rover, instructions);
      res.json({ resultado: presenter(result) });
    } catch (error) {
      if (error instanceof InvalidInstructionError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}
