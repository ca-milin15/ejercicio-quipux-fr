import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  loading: any;

  constructor(public alertController: AlertController,
    private  loadingController: LoadingController)
  {

  }
 async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async inicializarSpinner (){
    this.loading = await this.loadingController.create({
      cssClass: 'spinner-class',
      message: 'Procesando...',
      spinner: 'crescent',
      translucent: true
    });
    return await this.loading.present();
  }

  async detenerSpinner() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
      this.loading = false;
    }
  }
}
