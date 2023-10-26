import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMacros } from '../../tracker/food.model';
import { TrackingService } from '../../tracker/tracking.service';

@Component({
  selector: 'app-calorie-card',
  templateUrl: './calorie-card.component.html',
  styleUrls: ['./calorie-card.component.scss'],
})
export class CalorieCardComponent implements AfterViewInit {
  @Input() macros: IMacros;
  @ViewChild('graph') private graphRef: ElementRef;
  caloriesLeft = 0;

  constructor(public trackingService: TrackingService,
              private route: ActivatedRoute) {
    this.fetchChartData();
    this.route.params.subscribe(this.fetchChartData.bind(this));
  }

  async ngAfterViewInit() {
    this.caloriesLeft = await this.trackingService.getCaloriesLeft();
  }

  private async updateChart() {
    this.caloriesLeft = await this.trackingService.getCaloriesLeft();
  }

  private fetchChartData() {
    this.trackingService.getMacrosAsObservable().subscribe(this.updateChart.bind(this));
    this.trackingService.getCaloriesLeft().then(value => {
      this.caloriesLeft = value;
    });
  }
}
