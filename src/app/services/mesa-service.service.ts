import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../models/Mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaServiceService {

  constructor(private http: HttpClient) {

  }

  public getMesasAbiertas(): Observable<Mesa[]>{
    return this.http.get<Mesa[]>('http://localhost:8080/mesasAbiertas/lista');
  }


  public postAbrirMesa(m1: Mesa): void{
    this.http.post('http://localhost:8080/mesasAbiertas/envio', m1).subscribe();
  }

  public postActualizar(m1: Mesa): void{
    this.http.post('http://localhost:8080/mesasAbiertas/updateMesa', m1).subscribe();
  }

  public postCerrarMesa(m1: Mesa): void{
    this.http.post('http://localhost:8080/mesasAbiertas/cobrarMesa', m1).subscribe();
  }




  public postResumenes(fechas: Date[]): void{
    this.http.post('http://localhost:8080/mesasAbiertas/FechasResumenes', fechas).subscribe();
  }

  public getResumenes(): Observable<Mesa[]>{
    return this.http.get<Mesa[]>('http://localhost:8080/mesasAbiertas/Resumenes');
  }

}