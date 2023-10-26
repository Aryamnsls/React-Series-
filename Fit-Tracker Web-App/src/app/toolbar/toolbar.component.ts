import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  showAddButton = true;

  constructor(private router: Router, private platform: Platform) { }

  ngOnInit() {
    if (this.platform.is('mobile')) {
      Keyboard.addListener('keyboardDidShow', () => this.showAddButton = false);
      Keyboard.addListener('keyboardDidHide', () => this.showAddButton = true);
    }
  }

  onAddFood() {
    this.router.navigate(['food']);
  }
}
