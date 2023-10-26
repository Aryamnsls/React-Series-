import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {IFetchFoodData} from './food-response.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private readonly autoCompleteAP: string = 'https://api.edamam.com/auto-complete';
  private readonly foodDataAP: string = 'https://api.edamam.com/api/food-database/v2/parser';
  private readonly fetchFoodLimit = 10;

  constructor(private httpClient: HttpClient) {
  }

  fetchFoodAutocomplete(search: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.autoCompleteAP, {
      params: {
        app_id: environment.appId,
        app_key: environment.appKey,
        q: search,
        limit: this.fetchFoodLimit
      }
    });
  }

  fetchFoodData(food: string): Observable<IFetchFoodData> {
    return this.httpClient.get<IFetchFoodData>(this.foodDataAP, {
      params: {
        app_id: environment.appId,
        app_key: environment.appKey,
        ingr: food
      }
    });
  }
}
