import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-features',
  templateUrl: './card-features.component.html',
  styleUrls: ['./card-features.component.scss'],
})
export class CardFeaturesComponent implements OnInit {
  slideOptions = {
    slidesPerView: 1.2
  };

  constructor() { }

  ngOnInit() {}

}
