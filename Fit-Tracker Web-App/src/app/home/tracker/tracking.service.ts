import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Food, IMacros, Macros} from './food.model';
import {User} from '../../setup/user.model';
import {Preferences} from '@capacitor/preferences';
import {UserService} from '../../setup/user.service';

type MealHistory = { [day: string]: Food[] };

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  foods: Food[] = [];
  calories = 0;
  calorieGoal: number;
  macrosGoal: IMacros;
  macrosListener: Subject<Macros> = new Subject<Macros>();
  currentDay: string;

  private readonly calorieGoalKey = 'CALORIE_GOAL';
  private readonly consumedCaloriesKey = 'CONSUMED_CALORIES';
  private readonly mealHistoryKey = 'MEAL_HISTORY';
  private readonly currentDayKey = 'CURRENT_DAY';
  private readonly currentDayFoodsKey = 'CURRENT_DAY_FOODS';
  private readonly macroGoalKey = 'MACRO_GOAL';

  constructor(private userService: UserService) {
    this.init();
  }

  public async init() {
    this.currentDay = new Date().toDateString();

    await this.fetchCalorieGoal();
    await this.fetchMacroGoal();
    await this.fetchConsumedCalories();

    if (this.currentDay !== await this.fetchCurrentDay()) {
      await this.addCurrentDayToMealHistory().then(async () => {
        await this.reset();
        await this.saveCurrentDayFoods(true);
        this.setCurrentDay().then(async () => {
          const macros = await this.getMacros();
          this.macrosListener.next(macros);
        });

        await this.setDay(new Date());
      });
    } else {
      await this.setDay(new Date());
    }
  }

  public async setDay(day: Date) {
    this.reset();

    this.currentDay = day.toDateString();
    await this.setCurrentDay(this.currentDay);
    await this.saveConsumedCalories(0);

    const meals: MealHistory = await this.fetchMealHistory();
    let foodForTheDay: Food[] = [];

    if (meals[this.currentDay]) {
      foodForTheDay = meals[this.currentDay];
      for (let i = 0; i < foodForTheDay.length; i++) {
        this.calories += this.calculateCalories(foodForTheDay[i].macros);
      }
    }

    this.foods = foodForTheDay;

    await this.saveCurrentDayFoods();
    const macros = await this.getMacros();
    this.macrosListener.next(macros);
  }

  public calculateCalories(macros: IMacros): number {
    let calories = 0;
    calories += macros.protein * 4;
    calories += macros.carbs * 4;
    calories += macros.fats * 9;

    return calories;
  }

  public getMondayOfWeek(): Date {
    const date = new Date();
    const day = date.getDay() || 7;
      if(day !== 1 )
        {date.setHours(-24 * (day - 1));}

    return date;
  }

  public async calculateCalorieGoal(user: User) {
    let bmr: number;
    let amr: number;

    if (user.gender === 'male') {
      bmr = 66.47 + (13.75 * user.weight) + (5.003 * user.height) - (6.755 * user.age);
    } else {
      bmr = 655.1 + (9.563 * user.weight) + (1.850 * user.height) - (4.676 * user.age);
    }

    switch (user.activity) {
      case 'sedentary':
        amr = bmr * 1.2;
        break;
      case 'lightly_active':
        amr = bmr * 1.375;
        break;
      case 'moderately_active':
        amr = bmr * 1.55;
        break;
      case 'very_active':
        amr = bmr * 1.9;
        break;
    }
    if (user.goal === 'loose_weight') {
      amr -= 400;
    } else if (user.goal === 'gain_weight') {
      amr += 400;
    }

    this.calorieGoal = Math.round(amr);

    this.macrosGoal = {
      protein: Math.round((this.calorieGoal * 0.3) / 4),
      carbs: Math.round((this.calorieGoal * 0.4) / 4),
      fats: Math.round((this.calorieGoal * 0.3) / 9)
    };

    if (user.goal === 'loose_weight') {
      this.macrosGoal = {
        protein: Math.round((this.calorieGoal * 0.4) / 4),
        carbs: Math.round((this.calorieGoal * 0.4) / 4),
        fats: Math.round((this.calorieGoal * 0.2) / 9)
      };
    }

    await Preferences.set({key: this.calorieGoalKey, value: this.calorieGoal.toString()});
    await Preferences.set({key: this.macroGoalKey, value: JSON.stringify(this.macrosGoal)});

    return {
      calories: this.calorieGoal,
      macros: this.macrosGoal
    };
  }

  public async addFood(food: Food, quantity: number = 1): Promise<void> {
    if (!this.foods) {
      this.foods = [];
    }

    for (let i = 0; i < quantity; i++) {
      this.foods.push(food);
      this.calories += food.calories;
    }

    await this.saveCurrentDayFoods();
    await this.saveConsumedCalories();
    await this.addCurrentDayToMealHistory();
    const macros = await this.getMacros();
    this.macrosListener.next(macros);
  }

  public removeFood(food: Food): void {
    const mealIndex: number = this.foods.findIndex(meal => meal.name === food.name);

    if (mealIndex > -1) {
      this.foods.slice(mealIndex, 1);
    }
  }

  public getMacros(): Promise<IMacros> {
    const macros = new Macros();

    return new Promise<IMacros>(resolve => {
      this.fetchCurrentDayFoods().then(value => {
        this.foods = value;


        if (!this.foods) {
          this.foods = [];
        }
        for (let i = 0; i < this.foods.length; i++) {
          const element = this.foods[i];

          macros.protein += Math.round(Number(element.macros.protein));
          macros.carbs += Math.round(Number(element.macros.carbs));
          macros.fats += Math.round(Number(element.macros.fats));
        }

        resolve(macros);
      });
    });
  }

  public getMacrosAsObservable(): Observable<Macros> {
    return this.macrosListener.asObservable();
  }

  public async getCaloriesLeft(): Promise<number> {
    return this.calorieGoal - (this.calories);
  }

  public async fetchCurrentDay(): Promise<string> {
    const {value} = await Preferences.get({key: this.currentDayKey});
    return value;
  }

  public async fetchMealHistory(): Promise<MealHistory> {
    const {value} = await Preferences.get({key: this.mealHistoryKey});
    let parsedValue: { [day: string]: Food[] };

    if (value === undefined || !value || value === 'undefined') {
      parsedValue = {};
    } else {
      parsedValue = JSON.parse(value);
    }

    return parsedValue;
  }

  public async saveMealHistory(mealHistory: string) {
    console.log(mealHistory);
    await Preferences.set({key: this.mealHistoryKey, value: mealHistory});
  }

  public async updateMealHistoryDB(mealHistory: MealHistory) {
    if (!this.userService.uid) {
      return;
    }

    console.log(mealHistory);
    await this.userService.database.collection('mealHistory').doc(this.userService.uid).set(mealHistory);
  }

  public reset(): void {
    this.foods = [];
    this.calories = 0;
  }

  public async fetchMacroGoal() {
    const user = await this.userService.fetchUser();
    if (user) {
      this.macrosGoal = user.macroGoal;
    }
    return this.macrosGoal;
  }

  public async fetchCalorieGoal() {
    const user = await this.userService.fetchUser();
    console.log(user);
    if (user) {
      this.calorieGoal = Number(user.calorieGoal);
    }
    return this.calorieGoal;
  }

  public async saveCurrentDayFoods(empty: boolean = false) {
    await Preferences.set({key: this.currentDayFoodsKey, value: empty ? '[]' : JSON.stringify(this.foods)});
  }

  private async saveConsumedCalories(calories?: number) {
    await Preferences.set({key: this.consumedCaloriesKey, value: calories ? calories.toString() : this.calories.toString()});
  }

  private async fetchConsumedCalories() {
    const currentlySavedDay: string = await this.fetchCurrentDay();
    if (currentlySavedDay !== this.currentDay) {
      await this.addCurrentDayToMealHistory();
      await this.saveCurrentDayFoods();
      await this.saveConsumedCalories();
    }

    const {value} = await Preferences.get({key: this.consumedCaloriesKey});
    this.calories = Number(value);
  }

  private async addCurrentDayToMealHistory() {
    const mealHistory: MealHistory = await this.fetchMealHistory();
    const dayId: string = await this.fetchCurrentDay();
    mealHistory[dayId] = await this.fetchCurrentDayFoods();

    console.log('Update day', dayId, mealHistory);

    await this.updateMealHistoryDB(mealHistory);
    await Preferences.set({key: this.mealHistoryKey, value: JSON.stringify(mealHistory)});
  }

  private async setCurrentDay(date?: string) {
    await Preferences.set({key: this.currentDayKey, value: date ? date : new Date().toDateString()});
  }

  private async fetchCurrentDayFoods(): Promise<Food[]> {
    const {value} = await Preferences.get({key: this.currentDayFoodsKey});
    return JSON.parse(value);
  }
}
