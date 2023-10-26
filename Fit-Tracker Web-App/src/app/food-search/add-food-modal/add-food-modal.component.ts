import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from '@ionic/angular';
import {FavouritesService} from 'src/app/food-search/favourites/favourites.service';
import {Food} from '../../home/tracker/food.model';
import translate from 'translate';

@Component({
  selector: 'app-custom-food-modal',
  templateUrl: './add-food-modal.component.html',
  styleUrls: ['./add-food-modal.component.scss'],
})
export class AddFoodModalComponent implements OnInit {
  @Input() button = true;
  @ViewChild('modal') modal: IonModal;
  food: Food;
  quantity = 1;
  favourite = false;
  private initialFood: Food;
  private favourites: string[] = [];

  constructor(private favouritesService: FavouritesService,
              private modalController: ModalController) {
    if (!this.food) {
      this.food = new Food();
    }

    this.favouritesService.fetchFavourites().then(value => {
      this.favourites = value ? value : [];
    });
  }

  async ngOnInit() {
    this.favourite = (this.favourites ? this.favourites : []).indexOf(this.food.name) > -1;
    this.food.name = await translate(this.food.name, {from: 'en', to: 'bg'});
  }

  toggleFavourite() {
    if (this.favourite) {
      this.favouritesService.removeFoodFromFavourites(this.food.name).then(() => {
        this.favourite = false;
      });
    } else {
      this.favouritesService.addFoodToFavourites(this.food.name).then(() => {
        this.favourite = true;
      });
    }

  }

  onWeightChanged(event) {
    if (event.value && event.value < 1) {
      return this.food.weight = 1;
    } else if (event.value > 1000) {
      return this.food.weight = 1000;
    }

    if (!this.initialFood) {
      this.initialFood = this.food;
    }

    this.food.weight = event.value;

    const multiplier = event.value / 100;

    const foodCopyJson = JSON.stringify(this.initialFood);

    this.food.macros.protein = Math.round(this.initialFood.macros.protein * multiplier);
    this.food.macros.carbs = Math.round(this.initialFood.macros.carbs * multiplier);
    this.food.macros.fats = Math.round(this.initialFood.macros.fats * multiplier);
    this.food.calories = Math.round(this.initialFood.calories * multiplier);

    this.initialFood = JSON.parse(foodCopyJson);
  }

  onMacrosChanged(nutrientName: string, value: number) {
    const difference = value - Math.round(this.food.macros[nutrientName]);

    let multiplier = 1;
    multiplier = value > this.food.macros[nutrientName] ? multiplier : -multiplier;
    this.food.macros[nutrientName] = value;

    switch(nutrientName) {
      case 'protein' || 'carbs':
        this.food.calories += (difference * 4) * multiplier;
        break;
      case 'fats':
        this.food.calories += (difference * 9) * multiplier;
        break;
    }
  }

  updateQuantity(increase: boolean) {
    if (!increase && this.quantity === 1) {return;}

    this.quantity += increase ? 1 : -1;
  }

  cancel() {
    this.reset();
    return this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const foodCopy = this.food;
    this.reset();
    return this.modalController.dismiss({food: foodCopy, quantity: this.quantity}, 'confirm');
  }

  reset() {
    this.food = new Food();
  }
}
