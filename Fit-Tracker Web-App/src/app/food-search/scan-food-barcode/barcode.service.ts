import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IBarcodeProductData {
  product: {
    image_url: string;
    product_name: string;
    nutriments: {
      'energy-kcal': number;
      carbohydrates: number;
      fat: number;
      proteins: number;
    };
    product_quantity: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private apiUrl = 'https://world.openfoodfacts.org/api/v0/product/';
  constructor(private httpService: HttpClient) { }

  public fetchProductData(productBarcodeId: string): Observable<IBarcodeProductData> {
    return this.httpService.get<IBarcodeProductData>(this.apiUrl + productBarcodeId + '.json');
  }
}
