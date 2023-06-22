import { ElementRef, Renderer2 } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/productos-service.service';

@Component({
  selector: 'app-modal-eliminar-producto',
  templateUrl: './modal-eliminar-producto.component.html',
  styleUrls: ['./modal-eliminar-producto.component.css']
})
export class ModalEliminarProductoComponent {

  show: boolean;
  producto1: Producto;
  productos: Producto[];
  @ViewChild('salirDelModal') salirDelModal!: ElementRef;
  
  constructor(private renderer: Renderer2, private productoService: ProductoService){
    this.show = false;
    this.producto1 = new Producto();
    this.productos = [];


    this.renderer.listen('window', 'click', (e: Event) => {
      if(this.salirDelModal && e.target === this.salirDelModal.nativeElement ) {
        this.show = false;
      }
    });

  }

  showModal(producto: Producto, productos2: Producto[]): void {
    this.show = true;
    this.producto1 = producto;
    this.productos = productos2;

  }


  hideModal(){
    this.show = false;
  }

  confirmacionEliminarProducto(){
    this.productoService.eliminarProducto(this.producto1);
    for(let i:number = 0; i<this.productos.length; i++) {
      if(this.productos[i] === this.producto1) {
        this.productos.splice(i,1);
      }
    }
    this.show = false;
  }


}
