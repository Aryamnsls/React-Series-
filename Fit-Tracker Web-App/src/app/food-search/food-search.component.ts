import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {Food} from '../home/tracker/food.model';
import {TrackingService} from '../home/tracker/tracking.service';
import {FoodService} from './food.service';
import {AddFoodModalComponent} from './add-food-modal/add-food-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import {transliterate} from 'transliteration';
import translate from 'translate';

@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss'],
})
export class FoodSearchComponent implements OnInit {
  query: string;
  foundFoods: string[] = [];
  fetching = false;
  favouritesOpened = false;
  predefinedDate: string = null;
  predefinedFoodQuery: string = null;
  private loading: HTMLIonLoadingElement;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private trackingService: TrackingService,
              private foodService: FoodService,
              private modalController: ModalController,
              private loadingController: LoadingController) {
  }

  async ngOnInit() {
    this.loading = await this.loadingController.create();

    this.route.queryParams
      .subscribe(async params => {
        this.predefinedDate = params.day;
        this.predefinedFoodQuery = params.food;

        if (this.predefinedFoodQuery) {
          await this.loading.present();
          this.fetching = true;

          this.foodService.fetchFoodData(this.predefinedFoodQuery).subscribe(async value => {
            const food = new Food();
            food.name = value.text;
            food.image = value.parsed[0].food.image;
            food.weight = 100;
            food.macros.protein = value.parsed[0].food.nutrients.PROCNT;
            food.macros.carbs = value.parsed[0].food.nutrients.CHOCDF;
            food.macros.fats = value.parsed[0].food.nutrients.FAT;
            food.calories = value.parsed[0].food.nutrients.ENERC_KCAL;

            await this.openInputModal(food);
          }, err => {
            console.log(err);
          });
        }
      }
    );
  }

  openFavourites() {
    this.favouritesOpened = true;
  }

  closeFavourites() {
    this.favouritesOpened = false;
  }

  async inputChanged(event, trl = false) {
    const query: string = event.detail.value;
    if (query === '') {
      this.foundFoods = [];
      return;
    }

    let translatedQuery: string;
    if (trl) {
      translatedQuery = transliterate(query);
    } else {
      translatedQuery = await translate(query, {from: 'bg', to: 'en'});
    }

    await this.loading.present();
    this.fetching = true;

    this.foodService.fetchFoodAutocomplete(translatedQuery).subscribe(async value => {
      for (let i = 0; i < value.length; i++) {
        value[i] = await translate(value[i], {from: 'en', to: 'bg'});
      }
      this.foundFoods = value;
      if (this.foundFoods.length === 0 && !trl) {
        return this.inputChanged(event, true);
      }
      await this.loading.dismiss();
      this.fetching = false;
    }, async err => {
      console.log(err);
      this.fetching = false;
      await this.loading.dismiss();
    });
  }

  async onFoodSelected(food: string) {
    await this.loading.present();
    this.fetching = true;
    this.query = '';
    this.foundFoods = [];

    // Fetch food data
    this.foodService.fetchFoodData(food).subscribe(async value => {
      const food = new Food();
      food.name = value.text;
      food.image = value.parsed[0].food.image;
      food.weight = 100;
      food.macros.protein = value.parsed[0].food.nutrients.PROCNT;
      food.macros.carbs = value.parsed[0].food.nutrients.CHOCDF;
      food.macros.fats = value.parsed[0].food.nutrients.FAT;
      food.calories = value.parsed[0].food.nutrients.ENERC_KCAL;

      this.openInputModal(food);
    }, err => {
      console.log(err);
    });
  }

  private async openInputModal(food: Food) {
    this.fetching = false;
    await this.loading.dismiss();
    this.query = '';

    const modal = await this.modalController.create({
      component: AddFoodModalComponent,
      componentProps: {food}
    });

    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.onAddFood(data);
    } else {
      this.predefinedFoodQuery = null;
    }
  }

  private async onAddFood({food, quantity}) {
    if (!food.calories) {
      food.calories += food.macros.protein * 4;
      food.calories += food.macros.carbs * 4;
      food.calories += food.macros.fats * 9;
    }

    if (this.predefinedDate) {
      if (this.predefinedDate === new Date().toDateString()) {
        await this.trackingService.addFood(food, quantity);
        await this.trackingService.saveCurrentDayFoods();
        await this.router.navigate(['/meal_history'], {
          queryParams: {day: this.predefinedDate}
        });
        return;
      }

      const mealHistory = await this.trackingService.fetchMealHistory();
      let meals: Food[] = mealHistory[this.predefinedDate];
      if (!meals) {
        meals = [];
      }
      for(let i = 0; i < quantity; i++) {
        meals.push(food);
      }
      mealHistory[this.predefinedDate] = meals;
      this.trackingService.saveMealHistory(JSON.stringify(mealHistory));
      await this.router.navigate(['/meal_history'], {
        queryParams: {day: this.predefinedDate}
      });
    } else {
      await this.trackingService.addFood(food, quantity);
      await this.router.navigate(['/home']);
    }
  }
}
