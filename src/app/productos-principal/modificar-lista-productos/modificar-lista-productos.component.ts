import { Component } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/productos-service.service';

@Component({
  selector: 'app-modificar-lista-productos',
  templateUrl: './modificar-lista-productos.component.html',
  styleUrls: ['./modificar-lista-productos.component.css']
})
export class ModificarListaProductosComponent {

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
  }

  cambioDeValor(){
    
  }

  viendoProductos(){
    console.log("This.productos[0].nombre = " + this.productos[0].nombre );
    console.log("This.productos[0].precio = " + this.productos[0].precio );
    console.log("This.productos[1].nombre = " + this.productos[1].nombre );
    console.log("This.productos[1].precio = " + this.productos[1].precio );
  }


}
