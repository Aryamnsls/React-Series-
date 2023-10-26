import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-workout-group',
  templateUrl: './workout-group.component.html',
  styleUrls: ['./workout-group.component.scss'],
})
export class WorkoutGroupComponent implements OnInit {
  @Input() groupName: string;
  @Input() images: string[];
  @Input() slideOptions;
  @Input() margin = true;
  @Output() workoutSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onWorkoutSelected(img: string) {
    this.workoutSelected.emit(img);
  }

}
