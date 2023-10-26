
import { Router, Request, Response, NextFunction } from 'express';
import {IUserInputDTO} from "../../interfaces/IUser";
import AuthService from '../../services/AuthService';

const route = Router();

export default (app: Router) => {

  const service = new AuthService();


  app.use('/auth', route);

  route.post('/signup', async (req: Request, res: Response,next: NextFunction) => {
    try {


        const { user,token } = await service.SingUp(req.body as IUserInputDTO);
        return res.status(201).json({ user, token});
      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


  });

  route.post('/signin', async (req: Request, res: Response,next: NextFunction) => {
    // return res.json("OK").status(200);


    try {
      const { email, password } = req.body;

      const { user,token } = await service.SignIn(email, password);
      res.setHeader(        "Set-Cookie",`token=${token}; HttpOnly`);
      res.setHeader("Access-Control-Allow-Credentials","true");
      return res.json({ user,token });
    } catch (e) {
      // logger.error('🔥 error: %o',  e );
      return next(e);
    }


  });


};