import {Component, OnInit} from '@angular/core';
import {TrackingService} from '../home/tracker/tracking.service';
import {Food, Macros} from '../home/tracker/food.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  date: Date = new Date();
  macrosOverview: Macros = new Macros();
  fetching = false;
  meals: Food[];
  totalCalories = 0;
  day: string;
  selectingDay: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private trackingService: TrackingService) { }

  async ngOnInit() {
    this.day = new Date().toDateString();
    await this.fetchMeals();

    this.router.events.forEach(async (event) => {
      if(event instanceof NavigationEnd && this.router.url.includes('meal_history')) {
        this.date = new Date();
        this.day = new Date().toDateString();
        await this.fetchMeals();
      }
    });

    this.route.queryParams.subscribe(async params => {
      if (params.day) {
        this.date = new Date(params.day);
        this.day = this.date.toDateString();
      } else {
        this.date = new Date();
        this.day = new Date().toDateString();
      }

      await this.fetchMeals();
    });
  }

  addFood(food?: string) {
    this.router.navigate(['/food'],
    {
      queryParams: { day: this.day, food }
    });
  }

  async onDateSelected(event) {
    const date = event.detail.value;
    this.day = new Date(date).toDateString();

    this.selectingDay = false;
    await this.fetchMeals();
  }

  async onDateChanged(changeString: string) {
    switch (changeString) {
      case 'select_day':
        this.selectingDay = true;
        break;
      case 'previous':
        const yesterday = this.date.getDate() - 1;
        this.date = new Date(this.date.setDate(yesterday));
        this.day = this.date.toDateString();
        await this.fetchMeals();
        break;
      case 'next':
        const tomorrow = this.date.getDate() + 1;
        this.date = new Date(this.date.setDate(tomorrow));
        this.day = this.date.toDateString();
        await this.fetchMeals();
        break;
      default:
        break;
    }
  }

  private async fetchMeals()
  {
    this.fetching = true;
    this.macrosOverview = new Macros();
    const mealHistory = await this.trackingService.fetchMealHistory();

    this.totalCalories = 0;
    
    this.meals = mealHistory[this.day];

    if (!this.meals) {
      this.meals = [];
    }

    for(let i = 0; i < this.meals.length; i++) {
      const meal = this.meals[i];
      this.macrosOverview.protein += meal.macros.protein;
      this.macrosOverview.carbs += meal.macros.carbs;
      this.macrosOverview.fats += meal.macros.fats;
      this.totalCalories += meal.calories;
    }

    this.fetching = false;
  }
}
