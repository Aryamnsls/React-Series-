
import { Router, Request, Response } from 'express';
import middlewares from '../../middleware';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
};