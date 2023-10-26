import {Component, OnInit} from '@angular/core';
import {TrackingService} from '../tracker/tracking.service';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss'],
})
export class DaySelectorComponent implements OnInit {
  daySelected: string;

  constructor(private trackingService: TrackingService) {
  }

  async ngOnInit() {
    this.daySelected = (new Date(await this.trackingService.fetchCurrentDay()).getDay() - 1).toString();
    this.daySelected = Number(this.daySelected) < 0 ? '6' : this.daySelected;
  }

  async onDaySelected() {
    const mondayDate = this.trackingService.getMondayOfWeek();
    mondayDate.setDate(mondayDate.getDate() + Number(this.daySelected));
    await this.trackingService.setDay(mondayDate);
  }
}
