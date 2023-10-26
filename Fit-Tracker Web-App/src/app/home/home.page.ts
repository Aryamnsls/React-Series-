 import {Component, OnInit} from '@angular/core';
import {Macros} from './tracker/food.model';
import {TrackingService} from './tracker/tracking.service';
import {UserService} from '../setup/user.service';
 import {LoadingController} from '@ionic/angular';
 import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  macros: Macros;
  username: string;
  userInit: boolean;
  slideOpts = {
    scrollbar: true,
    slidesPerView: 1.2
  };
  loaded = false;

  constructor(private trackingService: TrackingService,
              private userService: UserService,
              private loadingController: LoadingController,
              private router: Router) {
    this.trackingService.getMacrosAsObservable().subscribe((value: Macros) => {
      this.macros = value;
    });
    this.userService.fetchUser().then(async value => {
      if (!value) {
        return await this.router.navigateByUrl('auth', {replaceUrl: true});
      }

      this.username = value.name;
      this.userInit = value.init;
      await this.init();
    });
  }

  private async init() {
    if (!this.userInit) {
      const loading = await this.loadingController.create();
      await loading.present();

      setTimeout(async () => {
        this.macros = await this.trackingService.getMacros();
        this.userService.userLogged = true;
        this.userService.userLoggedStatus.next(true);
        this.loaded = true;
        await this.userService.initUserDB();
        await loading.dismiss();
      }, 1500);
    } else {
      this.macros = await this.trackingService.getMacros();
      this.userService.userLogged = true;
      this.userService.userLoggedStatus.next(true);
      this.loaded = true;
    }
  }
}
