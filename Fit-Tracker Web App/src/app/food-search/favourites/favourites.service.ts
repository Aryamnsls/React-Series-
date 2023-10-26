import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private readonly favouritesKey = 'FAVOURITES';

  constructor() {
    this.initiate();
  }

  public async addFoodToFavourites(name: string) {
    const favourites = await this.fetchFavourites();
    favourites.push(name);
    await Preferences.set({key: this.favouritesKey, value: JSON.stringify(favourites)});
  }

  public async removeFoodFromFavourites(name: string) {
    let favourites = await this.fetchFavourites();
    const foodIndex = favourites.indexOf(name);

    if (foodIndex > -1 && favourites.length === 1) {
      favourites = [];
    } else {
      favourites.splice(foodIndex, 1);
    }

    await Preferences.set({key: this.favouritesKey, value: JSON.stringify(favourites)});
  }

  public async fetchFavourites(): Promise<string[]> {
    const {value} = await Preferences.get({key: this.favouritesKey});
    return JSON.parse(value);
  }

  public async checkIfFavourite(name: string): Promise<boolean> {
    return await this.fetchFavourites()[name];
  }

  private initiate() {
    this.fetchFavourites().then(async value => {
      if (!value) {
        await Preferences.set({key: this.favouritesKey, value: '[]'});
      }
    });
  }
}
