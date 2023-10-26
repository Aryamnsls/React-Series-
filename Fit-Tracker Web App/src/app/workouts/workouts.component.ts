import {Component, OnDestroy, OnInit} from '@angular/core';
import {File} from '@ionic-native/file/ngx';
import {HttpClient} from '@angular/common/http';
import {Directory, Filesystem} from '@capacitor/filesystem';
import {Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  slideOpts = {
    scrollbar: true,
    slidesPerView: 1.5
  };
  overlayImage: string;
  file: File;
  constructor(private http: HttpClient,
              private platform: Platform,
              private toastController: ToastController) { }

  ngOnInit() {
    if (window.screen.width < 768) {
      this.slideOpts.slidesPerView = 1.2;
    }
  }

  ngOnDestroy() {
    this.closeOverlay();
  }

  closeOverlay() {
    this.overlayImage = null;
  }

  onDisplayOverlay(img: string) {
    this.overlayImage = img;
  }

  onSaveImage() {
    this.http.get(this.overlayImage, { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result;

          await this.saveImageToGallery(base64data.toString(), 'fit_keeper_workout');
        };

        reader.readAsDataURL(res);
      });
  }

  private async saveImageToGallery(dataURI: string, filename: string) {
    if (this.platform.is('mobile')) {
      const savedFile = await Filesystem.writeFile({
        path: `${filename + new Date().toDateString()}.png`,
        data: dataURI,
        directory: Directory.Documents
      });
    } else {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL();
        a.click();
      };
      img.src = dataURI;
    }
    const toast = await this.toastController.create({
      position: 'bottom',
      duration: 3000,
      buttons: [
        {
          text: 'Затвори',
          role: 'cancel'
        }
      ],
      message: 'Успешно запазено в хранилището'
    });

    await toast.present();
  }
}
