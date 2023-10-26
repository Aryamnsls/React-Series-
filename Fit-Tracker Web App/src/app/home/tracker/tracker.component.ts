import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {IMacros} from './food.model';
import {TrackingService} from './tracking.service';
import {ActivatedRoute} from '@angular/router';

Chart.register(...registerables);
Chart.defaults.color = '#000';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements AfterViewInit {
  @Input() macros: IMacros;
  @ViewChild('graph') private graphRef: ElementRef;
  graph: Chart;
  macroGoal: IMacros;
  caloriesLeft = 0;

  constructor(public trackingService: TrackingService,
              private route: ActivatedRoute) {
    this.trackingService.getMacrosAsObservable().subscribe(this.updateChart.bind(this));
    this.trackingService.getCaloriesLeft().then(async value => {
      this.caloriesLeft = value;
      this.macroGoal = await this.trackingService.fetchMacroGoal();
      console.log(this.macroGoal);
    });

    this.route.params.subscribe(() => {
      this.trackingService.getMacrosAsObservable().subscribe(this.updateChart.bind(this));
      this.trackingService.getCaloriesLeft().then(value => {
        this.caloriesLeft = value;
      });
    });
  }

  async ngAfterViewInit() {
    this.caloriesLeft = await this.trackingService.getCaloriesLeft();

    this.graph = new Chart(this.graphRef.nativeElement, {
      type: 'doughnut',
      options: {
        animation: {
          animateScale: false
        }
      },
      data: {
        labels: ['Консумирани', 'Остават'],
        datasets: [{
          label: 'Calories',
          data: [Math.round(this.trackingService.calories), (Math.round(this.caloriesLeft) < 0 ? 0 : Math.round(this.caloriesLeft))],
          backgroundColor: [
            '#802E11',
            '#E76B3F'
          ],
        }]
      }
    });
  }

  private async updateChart() {
    this.caloriesLeft = await this.trackingService.getCaloriesLeft();

    this.graph.data.datasets[0].data.pop();
    this.graph.data.datasets[0].data.pop();

    this.graph.data.datasets[0].data.push(this.trackingService.calories);
    this.graph.data.datasets[0].data.push(this.caloriesLeft);

    this.graph.update();
  }
}
