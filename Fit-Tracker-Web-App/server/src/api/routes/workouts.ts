
import { Router, Request, Response, NextFunction } from 'express';
import AdminService from "../../services/adminServices/AdminService"


const route = Router();

export default (app: Router) => {
    const service = new AdminService();



  app.use('/workout', route);


  route.get('/list/exercises', async (req: Request, res: Response,next: NextFunction) => {
    try {

        const exercises = await service.ListAllExercises();
        return res.status(200).json(exercises);

      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


  });


};