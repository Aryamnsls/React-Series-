import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Macros } from 'src/app/home/tracker/food.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateGraphService {
  private updatePreviewGraph: Subject<Macros> = new Subject<Macros>();

  constructor() { }

  updateGraphPreview(macros: Macros) {
    this.updatePreviewGraph.next(macros);
  }

  getUpdateGraphAsObservable(): Observable<Macros> {
    return this.updatePreviewGraph.asObservable();
  }
}
