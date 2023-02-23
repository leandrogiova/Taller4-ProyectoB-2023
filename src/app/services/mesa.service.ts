import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Mesa } from '../models/Mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient) { 

  }

  public getAllMesasAbiertas(): Observable<Mesa[]> {
    return  this.http.get<Mesa[]>('http://localhost:8080/mesasAbiertas/lista');
  }


  public postNuevaMesa(mesa: Mesa): void{
    console.log("Enviando al servidor...");
    console.log("\nEnviando una nueva mesa: \n", mesa);
    this.http.post('http://localhost:8080/mesasAbiertas/envio', mesa).subscribe();
    //error en la base de datos
    //hay que modificar la bases de datos
  }

}








