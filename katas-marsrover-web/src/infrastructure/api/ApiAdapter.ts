import express from 'express';
import { ApiController } from './ApiController';

export class ApiAdapter {
  private app = express();

  constructor(private controller: ApiController) {
    this.app.use(express.json());
    this.routes();
  }

  private routes() {
    this.app.get('/rover', (req, res) => {
      this.controller.handle(req, res);
    });
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  }
  getApp() {
    return this.app;
  }
}
