import {IUser,IUserInputDTO} from '../../interfaces/IUser';
import {IExercise,IExerciseInputDTO} from '../../interfaces/workout/IExercise';
import {IWorkoutRoutine} from '../../interfaces/workout/IWorkoutRoutine';
import {IWorkoutSet} from '../../interfaces/workout/IWorkoutSet';
import User from '../../models/User'
import {ExerciseModel,WorkoutRoutineModel,WorkoutSetModel,WeightedWorkoutSet,TimedWorkoutSet} from '../../models/Exercise'


/**
 * This service is designed to take care of most of the backend administration things.
 * This might need to be separated and split into micro services for the various areas.
 */
export default class AdminService{


    public async ListAllExercises():Promise<{exercises:IExercise[]}>{

        try {
            const  allExercises= await ExerciseModel.find();

            const exercises:IExercise[] = allExercises.map((exercise) =>
                {return exercise.toObject();});
            return {exercises};

        } catch (error) {
            throw error;
        }

    }

    /**
     * Returns all users within the system.
     */
    public async ListAllUsers():Promise<{users:IUser[]}>{

        try {
            const allUsers = await User.find();

            const users:IUser[] = allUsers.map((user) =>
                {   const u = user.toObject();
                    Reflect.deleteProperty(u, 'password');
                return u;
            });
            return {users};
        } catch (error) {
            throw error;
        }

    }

    public async AddExercise(exerciseInputDTO:IExerciseInputDTO):Promise<{exercise:IExercise}>{

        try{
          const exercise = await new ExerciseModel({
              ...exerciseInputDTO,
          }).save();

            return { exercise };

          } catch (e) {

            throw e;
          }
      }

      public async AddWorkoutSet():Promise<{ret:any}>{
        const ex = await ExerciseModel.findOne();

        const ret:any = await new TimedWorkoutSet({
            start:Date.now(),
            end: Date.now(),
            exercise:ex
        }).save();

        return ret;
      }

      public async AddRoutine():Promise<{workoutroutine:IWorkoutRoutine}>{

        try{
            const x = await WorkoutSetModel.findOne();
          const workoutroutine = await new WorkoutRoutineModel({
              name:"Test Routine",
              description: "just a test",
          });

          workoutroutine.exercises.push(x);
          await workoutroutine.save()




            return { workoutroutine };

          } catch (e) {

            throw e;
          }
      }

}