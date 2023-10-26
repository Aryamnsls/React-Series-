/**
 * Describes the exercise.
 * with name, description
 * showing the muscle groups it affects and maybe media to showcase the exercise like a youtube video?
 */
export interface IExercise {
    name: string;
    description: string;
    muscle_groups: string; // maybe like tags? definetly can be multiple -> could refer back to an image for visualization
    media: string; // can be multiple like video, image etc


    // not sure if this is required?
    type: string; // determins if its a time based excercise
}


export interface IExerciseInputDTO{
    name:string
}