import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PickerColumnOption, PickerController} from '@ionic/angular';

@Component({
  selector: 'app-nutrient-button',
  templateUrl: './nutrient-button.component.html',
  styleUrls: ['./nutrient-button.component.scss'],
})
export class NutrientButtonComponent implements OnInit {
  @Input() nutrientName: string;
  @Input() value: number;
  @Output() changeValue: EventEmitter<{ key: string, value: number }> = new EventEmitter<{ key: string, value: number }>();

  constructor(private pickerControler: PickerController) {
  }

  ngOnInit() {
  }

  async openPicker() {
    const options: PickerColumnOption[] = [];
    const kilogram = 1000;
    let selectedIndex: number = 0;

    for (let i = 0; i <= kilogram; i++) {
      if (Math.round(this.value) === i) {
        selectedIndex = i;
      }

      options.push({
        text: i.toString(),
        value: i
      });
    }

    const picker = await this.pickerControler.create({
      columns: [
        {
          name: 'weight',
          options: options
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.onChangeValue(value.weight.value);
          },
        },
      ],
    });

    picker.columns[0].selectedIndex = selectedIndex;

    await picker.present();
  }

  onChangeValue(value: number): void {
    this.changeValue.emit({key: this.nutrientName, value});
  }

  onChangeValueEvent(event) {
    this.changeValue.emit({key: this.nutrientName, value: this.value});
  }

}
