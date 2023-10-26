import { Component, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import { Chart } from 'chart.js';
import { Food, Macros } from 'src/app/home/tracker/food.model';
import { UpdateGraphService } from './update-graph.service';

@Component({
  selector: 'app-food-graph-preview',
  templateUrl: './food-graph-preview.component.html',
  styleUrls: ['./food-graph-preview.component.scss'],
})
export class FoodGraphPreviewComponent implements AfterViewInit {
  @Input() food: Food;
  @ViewChild('graph') private graphRef: ElementRef;
  graph: Chart;

  constructor(private updateGraphService: UpdateGraphService) { }

  ngAfterViewInit(): void {
    this.updateGraphService.getUpdateGraphAsObservable().subscribe(this.updateGraph.bind(this));

    this.graph = new Chart(this.graphRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Carbs', 'Fats'],
        datasets: [{
          label: 'Macros',
          data: [this.food.macros.protein, this.food.macros.carbs, this.food.macros.fats],
          backgroundColor: [
            '#4DB4D7',
            '#48BF91',
            '#333333'
          ],
          hoverBackgroundColor: [
            '#4DB4D7',
            '#48BF91',
            '#333333'
          ]
        }]
      }
    });
  }

  private updateGraph(macros: Macros) {
    this.graph.data.datasets[0].data.pop();
    this.graph.data.datasets[0].data.pop();
    this.graph.data.datasets[0].data.pop();

    this.graph.data.datasets[0].data.push(macros.protein);
    this.graph.data.datasets[0].data.push(macros.carbs);
    this.graph.data.datasets[0].data.push(macros.fats);

    this.graph.update();
  }
}
