import { Component, OnInit } from '@angular/core';
import {User} from '../../../setup/user.model';
import {AlertController, LoadingController} from '@ionic/angular';
import {TrackingService} from '../../../home/tracker/tracking.service';
import {UserService} from '../../../setup/user.service';

@Component({
  selector: 'app-goals-setting-component',
  templateUrl: './goals-setting-component.component.html',
  styleUrls: ['./goals-setting-component.component.scss'],
})
export class GoalsSettingComponentComponent implements OnInit {
  user: User;
  calorieGoal: number;
  activityText: string;
  goalText: string;

  constructor(private alertController: AlertController,
              private loadingController: LoadingController,
              private trackingService: TrackingService,
              private userService: UserService) { }

  async ngOnInit() {
    await this.trackingService.fetchCalorieGoal();
    this.calorieGoal = this.trackingService.calorieGoal;
    this.user = await this.fetchUser();
    this.generateTexts();
  }

  async calculateCalorieGoal() {
    await this.trackingService.calculateCalorieGoal(this.user);
    this.calorieGoal = this.trackingService.calorieGoal;
  }

  async editValue(field: string, type?) {
    const inputs = [];

    if (type === 'list') {
      if (field === 'activity') {
        inputs.push(
          {
            label: 'Sedentary (little or no exercise)',
            type: 'radio',
            value: 'sedentary',
          },
          {
            label: 'Lightly active (1–3 days/week)',
            type: 'radio',
            value: 'lightly_active',
          },
          {
            label: 'Moderately active (3–5 days/week)',
            type: 'radio',
            value: 'moderately_active',
          },
          {
            label: 'Very active (6–7 days/week)',
            type: 'radio',
            value: 'very_active',
          },
        );
      } else {
        inputs.push(
          {
            label: 'Gain weight',
            type: 'radio',
            value: 'gain_weight',
          },
          {
            label: 'Maintain weight',
            type: 'radio',
            value: 'maintain_weight',
          },
          {
            label: 'Lose weight',
            type: 'radio',
            value: 'loose_weight',
          }
        );
      }
    } else {
      inputs.push({
        name: field,
        placeholder: 'Enter your ' + field,
        value: this.user[field],
        type: type ? type : 'text'
      });
    }

    const alert = await this.alertController.create({
      header: 'Edit details',
      buttons: [{
        text: 'Select',
        handler: async (alertData) => {
          const loading = await this.loadingController.create();
          await loading.present();
          await this.userService.updateUser(field, typeof alertData === 'object' ? (type === 'number' ? Number(alertData[field]) : alertData[field]) : alertData);
          this.user = await this.fetchUser();
          await this.calculateCalorieGoal();
          this.generateTexts();
          await loading.dismiss();
        }
      }],
      inputs
    });

    await alert.present();
  }

  private async fetchUser() {
    return await this.userService.fetchUser();
  }

  private generateTexts() {
    switch (this.user.activity) {
      case 'sedentary':
        this.activityText = 'Sedentary';
        break;
      case 'lightly_active':
        this.activityText = 'Lightly active';
        break;
      case 'moderately_active':
        this.activityText = 'Moderately Active';
        break;
      case 'very_active':
        this.activityText = 'Very Active';
        break;
    }

    switch (this.user.goal) {
      case 'loose_weight':
        this.goalText = 'Lose weight';
        break;
      case 'maintain_weight':
        this.goalText = 'Maintain weight';
        break;
      case 'gain_weight':
        this.goalText = 'Gain weight';
        break;
    }
  }
}
