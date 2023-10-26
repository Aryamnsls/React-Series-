import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
})
export class SettingsButtonComponent implements OnInit {
  @Input() settingName: string;
  @Output() editSetting: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  openEditSettingModal() {
    this.editSetting.emit(this.settingName);
  }
}
