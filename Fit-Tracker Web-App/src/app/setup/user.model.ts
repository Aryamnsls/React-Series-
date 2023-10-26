import { IMacros, Macros } from '../home/tracker/food.model';

export interface IUser {
    init: boolean;
    uid: string;
    name: string;
    gender: string;
    age: number;
    height: number;
    weight: number;
    goal: string;
    activity: string;
    macroGoal: IMacros;
    calorieGoal: number;
}

export class User implements IUser {
    init = false;
    uid: string;
    name: string;
    gender = 'male';
    age: number;
    height: number;
    weight: number;
    goal: string;
    activity: string;
    macroGoal: IMacros;
    calorieGoal: number;
}
