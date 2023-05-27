import { Component } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/productos-service.service';

@Component({
  selector: 'app-ver-lista-productos',
  templateUrl: './ver-lista-productos.component.html',
  styleUrls: ['./ver-lista-productos.component.css']
})
export class VerListaProductosComponent {

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


 

}
