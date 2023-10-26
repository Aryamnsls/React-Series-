import { IWorkoutSet } from "./IWorkoutSet";


/**
 * This is the workout routine compiled of multiple Workout Sets
 */
export interface IWorkoutRoutine {
    name: string;
    description: string;
    exercises: IWorkoutSet[];
}
