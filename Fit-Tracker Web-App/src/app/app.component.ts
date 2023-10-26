import {Component, OnInit} from '@angular/core';
import {UserService} from './setup/user.service';
import {Preferences} from '@capacitor/preferences';
import {IUser} from './setup/user.model';
import {TrackingService} from './home/tracker/tracking.service';
import {WeightTrackingService} from './home/weight-tracker/weight-tracking.service';
import {IWeightRecord} from './home/weight-tracker/weight-record.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly appearanceKey = 'APPEARANCE';

  constructor(private userService: UserService,
              private trackingService: TrackingService,
              private weightTrackingService: WeightTrackingService,
              private router: Router) { }

  async ngOnInit() {
    this.userService.userLoggedStatus.subscribe(async status => {
      if (status) {
        await this.syncWithDB();
      } else {
        await this.router.navigateByUrl('/auth', {replaceUrl: true});
      }
    });

    const {value} = await Preferences.get({key: this.appearanceKey});
    this.updateTheme(value);
  }

  async syncWithDB() {
    this.userService.fetchUserFromDatabase().subscribe(async (user: IUser | null) => {
      if (user) {
        await this.userService.createUser(user, false);
      }

      this.userService.fetchMealHistoryFromDatabase().subscribe(async mealHistory => {
        if (mealHistory) {
          await this.trackingService.saveMealHistory(JSON.stringify(mealHistory));
          this.trackingService.foods = mealHistory[new Date().toDateString()];
        } else {
          await this.trackingService.saveMealHistory('{}');
          this.trackingService.foods = [];
        }
      });

      this.userService.fetchWeightProgressFromDatabase().subscribe(async (weightProgress: {data: IWeightRecord[]}) => {
        if (weightProgress) {
          await this.weightTrackingService.saveWeightRecords(weightProgress.data);
          this.weightTrackingService.updateWeightChartSubject.next();
        }
      });
    });
  }

  private updateTheme(value: string) {
    switch (value) {
      case 'light_mode':
        document.body.setAttribute('color-theme', 'light');
        break;
      case 'dark_mode':
        document.body.setAttribute('color-theme', 'dark');
        break;
      default:
        value = 'light_mode';
        break;
    }
  }
}
