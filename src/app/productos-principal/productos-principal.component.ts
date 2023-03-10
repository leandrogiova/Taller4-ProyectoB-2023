import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/models/Producto';
import { ProductoService } from '../services/producto.service';



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
      numeroProducto: '',
      nombre: '',
      precio: '',
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
    console.log("Objeto traido del backeEnd: ",this.productos);
  }




  /*
     * FUNCION enviarProducto
     * Agrega un producto a la bases de datos.
  */
    enviarProducto():void{
      this.productoService.postProducto(this.agregarProducto.value);
      console.log("Agregando el objeto",this.agregarProducto.value, "\nObjeto Agregado a la base de datos");
  
      this.agregarProducto = this.fb.group({
        numeroProducto: '',
        nombre: '',
        precio: '',
      });
    }


    cambio(){
      //cambia el color
    }


}
