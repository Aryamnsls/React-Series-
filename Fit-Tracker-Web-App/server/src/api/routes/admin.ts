
import { Router, Request, Response, NextFunction } from 'express';
import {IExerciseInputDTO} from "../../interfaces/workout/IExercise"
import AdminService from "../../services/adminServices/AdminService";


const route = Router();

export default (app: Router) => {
    const service = new AdminService();



  app.use('/admin', route);

  route.post('/add/exercise', async (req: Request, res: Response,next: NextFunction) => {
    try {

      const exercise = await service.AddExercise(req.body as IExerciseInputDTO);
      return res.status(200).json(exercise);

    } catch (e) {
      // logger.error('🔥 error: %o',  e );
      return next(e);
    }


    });

    route.get('/add/routine', async (req: Request, res: Response,next: NextFunction) => {
      try {

        const b = await service.AddWorkoutSet();

        const a = await service.AddRoutine();
        return res.status(200).json(a);

      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


      });


  route.get('/list/users', async (req: Request, res: Response,next: NextFunction) => {
    try {

        const users = await service.ListAllUsers();
        return res.status(201).json(users);

      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


  });


};