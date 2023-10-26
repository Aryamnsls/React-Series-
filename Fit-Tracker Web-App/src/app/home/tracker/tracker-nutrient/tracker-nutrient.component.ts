import { Component, Input, OnInit } from '@angular/core';
import {IMacros} from '../food.model';

@Component({
  selector: 'app-tracker-nutrient',
  templateUrl: './tracker-nutrient.component.html',
  styleUrls: ['./tracker-nutrient.component.scss'],
})
export class TrackerNutrientComponent implements OnInit {
  @Input() macroGoal: IMacros;
  @Input() key: string;
  @Input() value: number;
  goal: number;

  constructor() { }

  ngOnInit() {
    switch (this.key) {
      case 'protein':
        this.goal = this.macroGoal.protein;
        break;
      case 'carbs':
        this.goal = this.macroGoal.carbs;
        break;
      case 'fat':
        this.goal = this.macroGoal.fats;
        break;
    }
  }

}
