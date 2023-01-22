import { Injectable } from '@angular/core';
import { Producto } from 'src/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  http: any;

  constructor() { }


  public postProducto(producto: Producto): void{
    console.log("Enviando al servidor...");
    console.log("\nEnviando el objeto: \n", producto);
    this.http.post('http://localhost:8080/productos/enviar', producto).subscribe();
    //error en la base de datos
    //hay que modificar la bases de datos
  }

}

