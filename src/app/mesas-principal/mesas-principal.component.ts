import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mesa } from '../models/Mesa';
import { Producto } from '../models/Producto';
import { MesaService } from '../services/mesa.service';
import { ProductoService } from '../services/productos-service.service';

@Component({
  selector: 'app-mesas-principal',
  templateUrl: './mesas-principal.component.html',
  styleUrls: ['./mesas-principal.component.css']
})
export class MesasPrincipalComponent implements OnInit {

  agregarMesaNueva: FormGroup;
  numeroMesa: FormControl;
  fecha1Mesa: FormControl;
  mesas: Mesa[];
  productos: Producto[];
  lista: Producto[];
  mesa1: Mesa;

  verForm: boolean;
  verOcultar: string;














  constructor(private fb: FormBuilder, private servicioProducto: ProductoService, private mesaService: MesaService ) { 
    this.numeroMesa = new FormControl();
    this.fecha1Mesa = new FormControl();

    this.mesas = new Array();
    this.productos = new Array();
    this.lista = new Array();
    this.mesa1 = new Mesa();


    this.verForm = false;
    this.verOcultar = "Ver";



    this.agregarMesaNueva =  this.fb.group({
      //      numeroMesa: new FormControl('', [Validators.required, Validators.min(0), numeroDeMesaValidator.mesaExistenteConParametro(this.mesas) ] ),
      //      fecha1Mesa: new FormControl('', [Validators.required]),
      numeroMesa: new FormControl('', [Validators.required]),
      fecha1Mesa: new FormControl('', [Validators.required]),
      productoId: new FormControl(),
      detalleMesa: new FormControl()
    });
  }













  ngOnInit(): void {
    this.servicioProducto.getAllProductos().subscribe(productos => {
      this.productos = productos;
    });
    this.mesaService.getAllMesasAbiertas().subscribe(mesas => {
      this.mesas = mesas;
    });



  }








  /*
    * VerOcultarFormulario muestra u oculta el furmulario para abrir una nueva mesa
    * VerOcultarFormulario cambia el valor de la variable booleana verForm para mostrar/ocultar el formalario
    * No recibe parametros
    * No retorna ningun tipo
  */
  VerOcutarFormulario(){
    if(this.verForm) {
      this.verForm = false;
      this.verOcultar = "Ocultar";
    }
    else {
      this.verForm = true;
      this.verOcultar = "Ver";
    }
  }







/*
    * FUNCION AgregarProductoALista
    * agrega el producto seleccionado a una lista para luego agregar dicha lista a la nueva mesa que se va a abrir.
*/
AgregarProductoALista(){ 
  for(let i: number = 0; i <= this.productos.length; i++){   
    if(this.productos[i].id == this.agregarMesaNueva.controls['productoId'].value){
      this.lista.push(this.productos[i]);
      break;
    }
  }
}

/*
  * FUNCINO eliminarProductoDeLista($evet)
  * Elimina el producto de la lista 
  * $event es el numero de Id del producto
*/
eliminarProductoDeLista($event: any){
  for(let i: number = 0; i <= this.lista.length; i++){
    if($event.target.value == this.lista[i].id){

      this.lista.splice(i, 1);
      break;
    }
  }
}





 

  /*
    * FUNCION abrirNuevaMesa
    * Crea una nueva mesa (temporal) asignandole el estado de la mesa a true, la lista de productos agregadas anteriormente, pone los precios correspondientes
    * Y agrega esta mesa a la lista "this.mesas".
    * Envia esta mesa al servidor y limpia los formularios.
    * Una vez que envio la mesa al servidor necesito actualizar la lista de mesas "this.mesas" para traer el id de la mesa
    * Por ultimo limpio el formulario "abrirMesaForm"
  */
  abrirNuevaMesa(){
    this.mesa1 = new Mesa();
    this.mesa1.numero_mesa = this.agregarMesaNueva.controls['numeroMesa'].value;
    this.mesa1.estado = true;
    this.mesa1.fecha = this.agregarMesaNueva.controls['fecha1Mesa'].value;
//  console.log("1- Viendo la mesa: " + this.mesa1 + "\n\nviendo this.agregarMesaNueva" + this.agregarMesaNueva  );
    this.mesa1.detalle = this.agregarMesaNueva.controls['detalleMesa'].value;

    this.mesa1.precio_temporal = 0;
    this.mesa1.precio_total = 0;
    for(let i = 0; i < this.lista.length; i++){
      this.mesa1.precio_total = this.mesa1.precio_total + this.lista[i].precio;
    }
    this.mesa1.listaProductos = this.lista;
    
    console.log("Enviando mesa1: ", this.mesa1);
    this.mesaService.postNuevaMesa(this.mesa1);
    

    this.mesa1 = new Mesa;
    this.lista = [];
    this.agregarMesaNueva =  this.fb.group({
      numeroMesa: new FormControl('', [Validators.required, Validators.min(0)]),
      fecha1Mesa: new FormControl('', [Validators.required]),
      productoId: new FormControl('', [])
    });





/*     
    let mesa_: Mesa = new Mesa();
    mesa_.numero_mesa = this.agregarMesaNueva.controls['numeroMesa'].value;
    mesa_.estado = true;
    mesa_.fecha = this.agregarMesaNueva.controls['fecha1Mesa'].value;
    mesa_.precio_temporal = 0;
//    mesa_.precio_total = 0;
    for(let e in this.lista){
      mesa_.precio_total = mesa_.precio_total + mesa_.listaProductos[e].precio;
    }
    mesa_.listaProductos = this.lista;
    console.log("mesa_  ", mesa_);

   
    //   mesa_.productosCobrados = [];
//    mesa_.listaProductos = this.lista; 
    mesa_.precio_total = 0;
    mesa_.formaDePago = "Efectivo";
//    for(let e in this.lista){
//        mesa_.precio_total = mesa_.precio_total + mesa_.listaProductos[e].precio;
//    }
    mesa_.listaProductos = this.lista;
    this.mesas.push(mesa_);
    this.mesaService.postNuevaMesa(mesa_);
    this.lista = [];

    this.agregarMesaNueva =  this.fb.group({
      numeroMesa: new FormControl('', [Validators.required, Validators.min(0)]),
      fecha1Mesa: new FormControl('', [Validators.required]),
      productoId: new FormControl('', [])
    });
*/
  }





  vermesass(){
    this.mesaService.getAllMesasAbiertas().subscribe(mesas => {
      this.mesas = mesas;
    });

    console.log("\n mesas: ", this.mesas, "\nProductos: ", this.productos);





  }














}
