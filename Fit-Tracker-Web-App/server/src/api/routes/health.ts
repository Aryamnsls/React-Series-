import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/', route);

  route.get('/status', (req: Request, res: Response) => {
    return res.json("OK").status(200);
  });
};