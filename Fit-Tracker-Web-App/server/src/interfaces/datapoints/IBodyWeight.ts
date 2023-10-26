import { Decimal128 } from "mongoose";
import { ISamplePoint } from "./ISamplePoint";




export interface IBodyWeight extends ISamplePoint{
    unit_of_measure: string; // the unit of measure like kg, g
}
