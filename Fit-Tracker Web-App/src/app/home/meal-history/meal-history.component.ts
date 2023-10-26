import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TrackingService} from '../tracker/tracking.service';

@Component({
  selector: 'app-meal-history',
  templateUrl: './meal-history.component.html',
  styleUrls: ['./meal-history.component.scss'],
})
export class MealHistoryComponent implements AfterViewInit {
  @ViewChild('graph') private graphRef: ElementRef;
  private readonly daysInAWeek = 7;
  private graph: Chart;

  constructor(private trackingService: TrackingService) {
    this.trackingService.getMacrosAsObservable().subscribe(this.updateGraph.bind(this));
  }

  async ngAfterViewInit() {
    const calories = await this.calculateCaloriesForDay();

    this.graph = new Chart(this.graphRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['ПОН', 'ВТО', 'СРЯ', 'ЧЕТ', 'ПЕТ', 'СЪБ', 'НЕД'],
        datasets: [{
          label: 'KCAL',
          data: calories,
          backgroundColor: [
            '#ffffff'
          ]
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
              font: {
                family: 'OpenSans'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              color: '#ffffff',
              font: {
                family: 'OpenSans'
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });

    this.graph.config.options.color = '#ffffff';
  }

  private async calculateCaloriesForDay(): Promise<number[]> {
    const mealHistory = await this.trackingService.fetchMealHistory();
    const calories: number[] = [];
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6:1);
    const monday = new Date(today.setDate(diff));

    const week = [];

    for (let i = 0; i < 7; i++) {
      week.push(new Date(monday));
      monday.setDate(monday.getDate() + 1);
    }

    for(let i = 0; i < this.daysInAWeek; i++) {

      const dateString = week[i].toDateString();

      if (mealHistory[dateString]) {
        let caloriesForDay = 0;
        for(let j = 0; j < mealHistory[dateString].length; j++) {
          caloriesForDay += mealHistory[dateString][j].calories;
        }

        calories.push(Math.round(caloriesForDay));
      } else {
        calories.push(0);
      }
    }

    return calories;
  }

  private async updateGraph() {
    const calories = await this.calculateCaloriesForDay();

    this.graph.data.datasets[0].data = null;
    this.graph.data.datasets[0].data = calories;
    this.graph.update();
  }
}
