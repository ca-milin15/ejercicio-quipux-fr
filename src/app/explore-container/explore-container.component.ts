/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TransactionServiceService } from '../transaction-service.service';
import { UtilidadesService } from '../utilidades/utilidades.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  LISTAS_REPROD_ENDPOINT: any = '/listaReproduccion';
  version: any;
  listaDelistasReproduccion: any[] = [];

  constructor(
    private navCtrl: NavController,
    private transactionServiceService: TransactionServiceService,
    private utilidadesService: UtilidadesService
  ) { }

  ngOnInit() {
    this.consultarListasReproduccion()
  }

  consultarListasReproduccion(){
    this.utilidadesService.inicializarSpinner().then(() => {
      this.transactionServiceService.ejecutarPeticion(this.LISTAS_REPROD_ENDPOINT.concat('/usuario/1'), {}, 'GET')
      .subscribe((ok) => {
        this.listaDelistasReproduccion = ok;
        console.log('listaDelistasReproduccion: ', this.listaDelistasReproduccion);
        this.utilidadesService.detenerSpinner();
      }, (err) => {
        this.utilidadesService.detenerSpinner();
      });
    });
  }

  abrirDetalle(lista){
    let cancionesAsTring = '';
    this.transactionServiceService.ejecutarPeticion(this.LISTAS_REPROD_ENDPOINT.concat('/').concat(lista.id), {}, 'GET')
      .subscribe((listaReproduccion) => {
        console.log('listaReproduccion ojo: ', listaReproduccion);
        listaReproduccion.canciones.forEach(cancion => {
          cancionesAsTring +=
            'Canción: '.concat(cancion.titulo).concat('<br>')
            .concat('Artista: ').concat(cancion.artista).concat('<br>')
            .concat('Album: ').concat(cancion.album).concat('<br>')
            .concat('Año: ').concat(cancion.anno).concat('<br>').concat('<br>');
        });
        this.utilidadesService.presentAlert(listaReproduccion.nombre, listaReproduccion.descripcion, cancionesAsTring);
        this.utilidadesService.detenerSpinner();
      }, (err) => {
        this.utilidadesService.detenerSpinner();
      });
  }

  crearListaReprod(){

  }
}
