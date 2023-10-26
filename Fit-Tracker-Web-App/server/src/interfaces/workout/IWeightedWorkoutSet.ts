import { IWorkoutSet } from "./IWorkoutSet";


/**
 * this exercise is based on weight (optional) and repetition
 */
export interface IWeightedWorkoutSet extends IWorkoutSet {
    weight_value: string; // the weight of the resistance? like 10 kg for curls
    repetition: number; // how many times to repeat

}
