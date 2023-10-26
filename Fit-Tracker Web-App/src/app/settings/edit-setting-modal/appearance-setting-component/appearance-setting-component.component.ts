import { Component, OnInit } from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Component({
  selector: 'app-appearance-setting-component',
  templateUrl: './appearance-setting-component.component.html',
  styleUrls: ['./appearance-setting-component.component.scss'],
})
export class AppearanceSettingComponentComponent implements OnInit {
  mode;
  private readonly appearanceKey = 'APPEARANCE';

  constructor() { }

  async ngOnInit() {
    const {value} = await Preferences.get({key: this.appearanceKey});
    this.updateTheme(value);
    this.mode = value;
  }

  async changeAppearance(event) {
    const value = event.detail.value;
    this.mode = value;
    this.updateTheme(this.mode);

    await Preferences.set({key: this.appearanceKey, value});
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
        this.mode = 'light_mode';
        break;
    }
  }
}
