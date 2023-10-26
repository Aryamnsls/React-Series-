import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {IonSlides, ToastController} from '@ionic/angular';
import {TrackingService} from '../home/tracker/tracking.service';
import {User} from './user.model';
import {UserService} from './user.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.page.html',
  styleUrls: ['./setup.page.scss'],
})
export class SetupPage implements AfterViewInit {
  @ViewChild(IonSlides) private slides: IonSlides;
  user: User = new User();
  private slideIndex = 1;

  constructor(private toastController: ToastController,
              private userService: UserService,
              private trackingService: TrackingService,
              private router: Router) { }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

  selectGender(gender: string) {
    this.user.gender = gender;
  }

  async nextSlide() {
    switch(this.slideIndex) {
      case 1:
        if (!this.user.gender || !this.user.name || !this.user.age) {
          return this.displayError('Моля попълнете всички данни!');
        }

        this.slideIndex = 2;
        break;
      case 2:
        if (!this.user.height || !this.user.weight) {
          return this.displayError('Моля попълнете всички данни!');
        }

        this.slideIndex = 3;
        break;
      case 3:
        this.trackingService.calculateCalorieGoal(this.user).then(async goal => {
          this.user.macroGoal = goal.macros;
          this.user.calorieGoal = goal.calories;
          await this.userService.createUser(this.user);
          await this.router.navigate(['/home']);
        });
        break;
    }

    await this.slides.lockSwipes(false);
    this.slides.slideNext().then(() => {
      this.slides.lockSwipes(true);
    });
  }

  private async displayError(message: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      duration: 3000,
      buttons: [
        {
          text: 'Затвори',
          role: 'cancel'
        }
      ],
      message
    });

    await toast.present();
  }
}
