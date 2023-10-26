import { IExercise } from "../interfaces/workout/IExercise";
import { ITimedWorkoutSet } from "../interfaces/workout/ITimedWorkoutSet";
import { IWeightedWorkoutSet } from "../interfaces/workout/IWeightedWorkoutSet";
import { IWorkoutRoutine } from "../interfaces/workout/IWorkoutRoutine";
import { IWorkoutSet } from "../interfaces/workout/IWorkoutSet";

import * as mongoose from 'mongoose';

const options = { timestamps: { createdAt: 'created_at' ,updatedAt: 'updated_at'} }
const discriminatorOption = {...options,discriminatorKey: 'kind'}

const Exercise: mongoose.Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    muscle_groups: {
        type: String,
    },
    media: {
        type: String,

    },
},options);

const WorkoutSet : mongoose.Schema = new mongoose.Schema({
    exercise:{
        type : mongoose.Schema.Types.ObjectId, ref: 'Exercise'
    },
},discriminatorOption);
const WorkoutSetModel = mongoose.model<IWorkoutSet & ITimedWorkoutSet & IWeightedWorkoutSet & mongoose.Document>('WorkoutSet', WorkoutSet);


const TimedWorkoutSet = WorkoutSetModel.discriminator('TimedWorkout', new mongoose.Schema({

        start:Date,
        end:Date

},discriminatorOption));

const WeightedWorkoutSet = WorkoutSetModel.discriminator('WeightedWorkout', new mongoose.Schema({

    weight_value:Number,
    repetition:Number

},discriminatorOption));

const WorkoutRoutine : mongoose.Schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    exercises:[{
        type : mongoose.Schema.Types.ObjectId, ref: 'WorkoutSet'
    }]

});

const ExerciseModel = mongoose.model<IExercise & mongoose.Document>('Exercise', Exercise);
const WorkoutRoutineModel = mongoose.model<IWorkoutRoutine & mongoose.Document>('WorkoutRoutine', WorkoutRoutine);

export {
    ExerciseModel,
    WorkoutRoutineModel,
    WorkoutSetModel,
    TimedWorkoutSet,
    WeightedWorkoutSet
}

//
// export mongoose.model<IWeightedWorkoutSet & mongoose.Document>('WeightedWorkoutSet', WeightedWorkoutSet);
// export mongoose.model<ITimedWorkoutSet & mongoose.Document>('TimedWorkoutSet', TimedWorkoutSet);