import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {



  constructor(private http: HttpClient) { 

  }


  public postProducto(producto: Producto): void{
    this.http.post('http://localhost:8080/productos/enviar', producto).subscribe();
  }



  public getAllProductos(): Observable<Producto[]> {
    return  this.http.get<Producto[]>('http://localhost:8080/productos/lista');
  }

  public eliminarProducto(producto: Producto): void{
    this.http.post('http://localhost:8080/productos/eliminar', producto).subscribe();
  }


}

