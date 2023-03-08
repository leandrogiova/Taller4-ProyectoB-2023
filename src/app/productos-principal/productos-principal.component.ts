import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/productos-service.service';




@Component({
  selector: 'app-productos-principal',
  templateUrl: './productos-principal.component.html',
  styleUrls: ['./productos-principal.component.css']
})
export class ProductosPrincipalComponent implements OnInit {

  
  agregarProducto: FormGroup;
  verListaProductos: boolean;
  productos: Producto[];


  constructor(private fb: FormBuilder, private productoService: ProductoService) { 
    this.productos = []; //estoy inicializando la lista a vacia
    
    this.agregarProducto = this.fb.group({
      numeroProducto: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
    this.verListaProductos = false;
  }


  ngOnInit(): void {
  }



  VerListaProducto(): void{
    this.verListaProductos = !this.verListaProductos;
    this.productoService.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });
  }




  /*
     * FUNCION enviarProducto
     * Agrega un producto a la bases de datos.
  */
    enviarProducto():void{
      this.productoService.postProducto(this.agregarProducto.value);
      console.log("Agregando el objeto",this.agregarProducto.value, "\nObjeto Agregado a la base de datos");

      this.productos.push(this.agregarProducto.value);
      this.agregarProducto = this.fb.group({
        numeroProducto: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        precio: new FormControl('', [Validators.required]),
      });
    }
}
