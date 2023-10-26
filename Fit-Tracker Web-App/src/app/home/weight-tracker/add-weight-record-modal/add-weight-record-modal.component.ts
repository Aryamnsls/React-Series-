import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {WeightRecord} from '../weight-record.model';

@Component({
  selector: 'app-add-weight-record-modal',
  templateUrl: './add-weight-record-modal.component.html',
  styleUrls: ['./add-weight-record-modal.component.scss'],
})
export class AddWeightRecordModalComponent {
  weightRecord: WeightRecord;

  constructor(private modalCtrl: ModalController) {
    this.weightRecord = new WeightRecord(new Date(), 0);
  }

  setWeight(event) {
    this.weightRecord.weight = Number(event.value);
  }

  onDateSelected(event) {
    const date = event.detail.value;
    this.weightRecord.date = new Date(date);
  }

  async onClose() {
    await this.modalCtrl.dismiss();
  }

  async onSave() {
    await this.modalCtrl.dismiss(this.weightRecord, 'confirm');
  }
}
