import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/home/tracker/food.model';

@Component({
  selector: 'app-history-food-list',
  templateUrl: './history-food-list.component.html',
  styleUrls: ['./history-food-list.component.scss'],
})
export class HistoryFoodListComponent implements OnInit {
  @Input() meals: Food[];

  constructor() { }

  ngOnInit() {}

}
