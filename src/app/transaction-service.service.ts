import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  contextoAplicacion: any = 'http://localhost:5000/ejercicio-quipux/servicio';
  //contextoAplicacion: string = environment.url.concat('/ejercicio-quipux/servicio');

  constructor(private httpClient: HttpClient) { }

  ejecutarPeticion(url: string, body: any, method: any): any{
    switch (method) {
      case 'POST':
        return this.httpClient.post(
          this.contextoAplicacion.concat(url),
          body
        );
      case 'GET':
        return this.httpClient.get(
          this.contextoAplicacion.concat(url),
          body
        );
      case 'DELETE':
        return this.httpClient.delete(
          this.contextoAplicacion.concat(url),
          body
        );
      default:
        break;
    }
  }

}
