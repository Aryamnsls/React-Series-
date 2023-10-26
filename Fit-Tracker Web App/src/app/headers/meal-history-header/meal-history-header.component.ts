import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-meal-history-header',
  templateUrl: './meal-history-header.component.html',
  styleUrls: ['./meal-history-header.component.scss'],
})
export class MealHistoryHeaderComponent implements OnInit {
  @Input() day: string;
  @Output() dayChanged: EventEmitter<string> = new EventEmitter<string>();
  date: Date;

  constructor() {
  }

  ngOnInit() {}

  onSelectDay() {
    this.dayChanged.emit("select_day");
  }

  onDaySelected() {
    this.dayChanged.emit(this.day);
  }

  onPreviousClicked() {
    this.dayChanged.emit("previous");
  }

  onNextClicked() {
    this.dayChanged.emit("next");
  }

}
