import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-setting-modal',
  templateUrl: './edit-setting-modal.component.html',
  styleUrls: ['./edit-setting-modal.component.scss'],
})
export class EditSettingModalComponent implements OnInit {
  @Input() modalOpen: boolean;
  @Input() settingId: string;
  @Output() closeSettingModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.closeSettingModal.emit();
  }
}
