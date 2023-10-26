import { Router, Request, Response } from 'express';
import AuthService from '../../services/AuthService';

const route = Router();

export default (app: Router) => {

  const service = new AuthService();

  app.use('/', route);

  route.get('/signup', (req: Request, res: Response) => {
    return  res.render('pages/signup');
  });
  route.get('/login', (req: Request, res: Response) => {
    return  res.render('pages/login');
  });

  route.post('/login', async (req: Request, res: Response) => {
    // return res.json("OK").status(200);


    try {
      const { email, password } = req.body;
      const { user } = await service.SignIn(email, password);
      return res.redirect('/dashboard');

    } catch (e) {
      // logger.error('🔥 error: %o',  e );
      throw e;
    }


  });

};