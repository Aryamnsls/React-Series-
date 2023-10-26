import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../setup/user.service';
import {User} from '../../../setup/user.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {TrackingService} from '../../../home/tracker/tracking.service';

@Component({
  selector: 'app-profile-setting-content',
  templateUrl: './profile-setting-content.component.html',
  styleUrls: ['./profile-setting-content.component.scss'],
})
export class ProfileSettingContentComponent implements OnInit {
  user: User;
  calorieGoal: number;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController,
              private trackingService: TrackingService,
              private userService: UserService) { }

  async ngOnInit() {
    await this.trackingService.fetchCalorieGoal();
    this.calorieGoal = this.trackingService.calorieGoal;
    this.user = await this.fetchUser();
  }

  async calculateCalorieGoal() {
    await this.trackingService.calculateCalorieGoal(this.user);
    this.calorieGoal = this.trackingService.calorieGoal;
  }

  async editValue(field: string, type?) {
    const alert = await this.alertController.create({
      header: 'Редакция',
      buttons: [{
        text: 'Промени',
        handler: async (alertData) => {
          const loading = await this.loadingController.create();
          await loading.present();
          await this.userService.updateUser(field, alertData[field]);
          this.user = await this.fetchUser();
          await this.calculateCalorieGoal();
          await loading.dismiss();
        }
      }],
      inputs: [
        {
          name: field,
          placeholder: 'Enter your ' + field,
          value: this.user[field],
          type: type ? type : 'text'
        }
      ],
    });

    await alert.present();
  }

  private async fetchUser() {
    return await this.userService.fetchUser();
  }
}
