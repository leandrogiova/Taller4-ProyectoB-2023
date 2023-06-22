import { Component } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/productos-service.service';

@Component({
  selector: 'app-modificar-lista-productos',
  templateUrl: './modificar-lista-productos.component.html',
  styleUrls: ['./modificar-lista-productos.component.css']
})
export class ModificarListaProductosComponent {


  EliminarProdBool: boolean = false;
  productos: Producto[];


  constructor(private productoService: ProductoService) { 
    this.productos = [];
  }

  ngOnInit(): void {
    this.productoService.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });




  }

  VerListaProducto(){
    this.productoService.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });
    console.log("\n\n\nLISTA:", this.productos);
  }



/*  * Funcion cambioDeValor
    * Modifica el numero de Producto, nombre o precio de un Producto en especifico.
    * Cambia el valor del campo correspondiente.
    * Si se quiere cambiar el nombre de un producto en especifico se puede cambiar!
    * Los campos que se permiten cambiar son "numberoProducto", "nombre", "precio".
    * La funcion recibe como parametros "$event" que es el "valor del campo"(es el dato nuevo) correspondiente a cambiar.
    *                                   "producto" para el producto que quiere modificar, para esto se hace un bucle recorriendo la lista de productos
    *                                              para encontrar al producto que se le quiere cambiar y una vez encontrardo el producto con el parametro "number"
    *                                              se va a cambiar el campo correspondiente.
    *                                   "number" corresponde al campo a cambiar
    *                                             0 ==> si se va a cambiar el numeroProducto
    *                                             1 ==> si se va a cambiar el nombre
    *                                             2 ==> si se va a cambiar el precio
    * No retorna parametros
*/
  cambioDeValor($event: any,producto: Producto, number: number){
    for(let e=0; e < this.productos.length; e++) {
      if(this.productos[e].id == producto.id) {

          if (number == 0) { this.productos[e].numeroProducto =  $event.target.value; this.productoService.postProducto(this.productos[e]); }   
          if (number == 1) { this.productos[e].nombre =  $event.target.value; this.productoService.postProducto(this.productos[e]); }
          if (number == 2) { this.productos[e].precio =  $event.target.value; this.productoService.postProducto(this.productos[e]); }
        
        }
    }
  }

}
