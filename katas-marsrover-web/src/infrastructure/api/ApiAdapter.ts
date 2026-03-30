import express, { Request, Response } from 'express';

export class ApiAdapter {
  private app = express();

  constructor(private system: any) {
    this.app.use(express.json());
    this.routes();
  }

  private routes() {
    this.app.get('/rover', (req: Request, res: Response) => {
      try {
        console.log('Received request with body:');
        const { execute, createRover, presenter } = this.system;

        const instructions: string[] = req.query.instructions ? (req.query.instructions as string).split('') : [];
        console.log('Received instructions:', instructions);

        const rover = createRover();
        const result = execute(rover, instructions);
        const output = presenter(result);
        console.log('Execution result:', output);

        res.json({ resultado: output });
      } catch (error) {
        res.status(500).json({ error: 'Error executing rover instructions' });
      }
    });
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  }
}
