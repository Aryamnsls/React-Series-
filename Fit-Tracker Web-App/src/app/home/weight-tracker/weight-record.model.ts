export interface IWeightRecord {
  weight: number;
  date: Date;
}

export class WeightRecord implements IWeightRecord {
  constructor(public date: Date, public weight: number) {
  }
}
