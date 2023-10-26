import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/', route);

  route.get('/', (req: Request, res: Response) => {
    return  res.render('pages/index');
    return res.json("HELLO WORLD").status(200);
  });
};