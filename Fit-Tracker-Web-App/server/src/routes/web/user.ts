import { Router, Request, Response } from 'express';
import {WorkoutRoutineModel} from '../../models/Exercise'

const route = Router();

export default (app: Router) => {


  app.use('/', route);

  // TODO: need middleware to check user's logged in
  route.get('/dashboard', async (req: Request, res: Response) => {
    return  res.render('pages/user/dashboard');
  });
  // TODO: need middleware to check user's logged in
  route.get('/workouts', async (req: Request, res: Response) => {
    const routines = await WorkoutRoutineModel
    .find()
    .populate({
      path: 'exercises',
      populate: {
        path: 'exercise',
      }})

    .lean();

    return  res.render('pages/user/workouts',{routines});
  });


};