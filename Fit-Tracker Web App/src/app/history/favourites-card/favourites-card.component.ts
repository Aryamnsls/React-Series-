import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FavouritesService } from 'src/app/food-search/favourites/favourites.service';
import { NavigationEnd, Router } from '@angular/router';
import translate from 'translate';

@Component({
  selector: 'app-favourites-card',
  templateUrl: './favourites-card.component.html',
  styleUrls: ['./favourites-card.component.scss'],
})
export class FavouritesCardComponent implements OnInit {
  @Output() addFood: EventEmitter<string> = new EventEmitter<string>();
  favourites: string[];

  constructor(private router: Router,
              private favouritesService: FavouritesService) { }

  async ngOnInit() {
    this.favourites = await this.favouritesService.fetchFavourites();

    this.router.events.subscribe(async event => {
      if(event instanceof NavigationEnd && this.router.url.includes('meal_history')) {
        this.favourites = await this.favouritesService.fetchFavourites();
      }
    });
  }

  async addFavouriteFood(food: string) {
    this.addFood.emit(await translate(food, {from: 'bg', to: 'en'}));
  }

}
