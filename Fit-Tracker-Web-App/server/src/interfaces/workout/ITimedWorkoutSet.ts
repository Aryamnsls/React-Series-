import { IWorkoutSet } from "./IWorkoutSet";


/**
 * this exercise is based on a time like 10 min or 10 sec etc.
 */
export interface ITimedWorkoutSet extends IWorkoutSet {
    duration: string;

}
