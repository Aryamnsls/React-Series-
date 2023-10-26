import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../setup/user.service';
import {IUser} from '../setup/user.model';
import {TrackingService} from '../home/tracker/tracking.service';
import {Preferences} from '@capacitor/preferences';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  credentials: FormGroup;
  authMode: string;

  constructor(private fb: FormBuilder,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private trackingService: TrackingService) { }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }

  async ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      confirmPassword: ['', [Validators.required, Validators.min(8)]]
    });

    this.route.queryParams.subscribe(async params => {
      this.authMode = params.authMode;

      if (!this.authMode) {
        await this.router.navigate(['auth'], {queryParams: {
          authMode: 'register'
        }});
      }
    });

    await Preferences.clear();
    this.userService.userLogged = false;
    this.userService.userLoggedStatus.next(false);
  }

  switchAuthMode() {
    this.authMode = this.authMode === 'register' ? 'login' : 'register';
  }
  async authorizeUser(mode: string, provider: string = 'default') {
    if (provider === 'default') {
      if ((this.password.errors || this.email.errors) || (this.authMode === 'register' && this.confirmPassword.errors)) {
        return;
      }

      if (this.authMode === 'register' && (this.password.value !== this.confirmPassword.value)) {
        const toast = await this.toastController.create({
          message: `Паролите не съвпадат!`,
          duration: 5000
        });

        return await toast.present();
      }
    }

    const loading = await this.loadingController.create();
    await loading.present();

    let user;
    if (provider === 'google') {
      user = await this.authService.authWithGoogle();
    } else {
      if (mode === 'register') {
        user = await this.authService.register(this.credentials.value);
      } else {
        user = await this.authService.login(this.credentials.value);
      }
    }
    await loading.dismiss();

    if (user) {
      await this.userService.setUID(user.user.uid);

      // Fetch user
      this.userService.fetchUserFromDatabase().subscribe(async (fetchedUser: IUser | null) => {
        if (fetchedUser) {
          await this.userService.createUser(fetchedUser, false);

          // Fetch meal history
          this.userService.fetchMealHistoryFromDatabase().subscribe(async mealHistory => {
            // Init user data
            if (mode === 'login' || (fetchedUser.init && provider === 'google')) {
              await this.trackingService.init();
              await this.trackingService.calculateCalorieGoal(fetchedUser);
              await this.trackingService.saveMealHistory(JSON.stringify(mealHistory));

              const todayFoods = mealHistory[new Date().toDateString()];

              this.trackingService.foods = todayFoods ? todayFoods : [];
              await this.trackingService.saveCurrentDayFoods();
              await this.trackingService.setDay(new Date());
            }

            await this.router.navigateByUrl('/home', {replaceUrl: true});
            location.reload();
          });
        } else {
          if (mode === 'register') {
            await this.router.navigateByUrl('/setup', {replaceUrl: true});
          } else {
            await this.router.navigateByUrl('/home', {replaceUrl: true});
            location.reload();
          }
        }
      });
    } else {
      const errKeyword = mode === 'register' ? 'регистрация' : 'вход';
      const toast = await this.toastController.create({
        message: `Грешка при ${errKeyword}. Опитайте отново!`,
        duration: 5000
      });
      await toast.present();
    }
  }
}
