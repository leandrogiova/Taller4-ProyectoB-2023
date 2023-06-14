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

  mesaform: FormGroup;
  numeroMesa: FormControl;
  fecha1Mesa: FormControl;


  mesas: Mesa[];
  productos: Producto[];
  lista: Producto[];
  mesa1: Mesa;

  verForm: boolean;
  verForm2: boolean;
  verForm3: boolean;
  verUnaMesaBool: boolean;
  verOcultar: string;
  verOcultar2: string;
  verOcultar3: string;
  numero: number;









  constructor(private fb: FormBuilder, private servicioProducto: ProductoService, private mesaService: MesaService ) { 
    this.numeroMesa = new FormControl();
    this.fecha1Mesa = new FormControl();

    this.mesas = new Array();
    this.productos = new Array();
    this.lista = new Array();
    this.mesa1 = new Mesa();

    this.verForm = false;
    this.verOcultar = "Ver";
    this.verOcultar2 = "Ver";
    this.verOcultar3 = "Ver";
    this.verUnaMesaBool = false;
    this.verForm2 = false;
    this.verForm3 = false;
    this.numero = 0;

    this.mesaform =  this.fb.group({
      //      numeroMesa: new FormControl('', [Validators.required, Validators.min(0), numeroDeMesaValidator.mesaExistenteConParametro(this.mesas) ] ),
      numeroMesa: new FormControl('', [Validators.required]),
      productoId: new FormControl(),
      detalleMesa: new FormControl()
    });
  }

  ngOnInit(): void {
    this.vermesass();
  }


  /*
    * FUNCION vermesas
    * Actualiza las variables "mesas" y "productos".
    * Sincronizandolas con la base de datos.
    * No recibe parametros.
    * No tiene retorno.
  */
    vermesass(){
      this.servicioProducto.getAllProductos().subscribe(productos => {
        this.productos = productos;
      });
      this.mesaService.getAllMesasAbiertas().subscribe(mesas => {
        this.mesas = mesas;
      });
    }






/* ----------------------------------------------------------------------------------------------*/



  /*
    * VerOcultarFormulario muestra u oculta el furmulario para abrir una nueva mesa
    * VerOcultarFormulario cambia el valor de la variable booleana verForm para mostrar/ocultar el formulario
    * No recibe parametros
    * No retorna ningun tipo
  */
  verOcutarFormulario(){
    if(this.verForm) {
      this.verForm = false;
      this.verOcultar = "Ver";
    }
    else {
      this.verForm = true;
      this.verOcultar = "Ocultar";
    }
  }

/*
    * FUNCION AgregarProductoALista
    * agrega el producto seleccionado a una lista para luego agregar dicha lista a la nueva mesa que se va a abrir.
*/
agregarProductoALista(){ 
  for(let i: number = 0; i <= this.productos.length; i++){   
    if(this.productos[i].id == this.mesaform.controls['productoId'].value){
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
    * No recibe parametros
    * No retorna ningun tipo
  */
  abrirNuevaMesa(){
    this.mesa1 = new Mesa();
    this.mesa1.numero_mesa = this.mesaform.controls['numeroMesa'].value;
    this.mesa1.estado = true;

    this.mesa1.fecha = new Date();
    this.mesa1.detalle = this.mesaform.controls['detalleMesa'].value;
    this.mesa1.forma_pago = "Efectivo";
    this.mesa1.precio_temporal = 0;
    this.mesa1.precio_total = 0;
    for(let i = 0; i < this.lista.length; i++){
      this.mesa1.precio_total = this.mesa1.precio_total + this.lista[i].precio;
    }
    this.mesa1.listaProductos = this.lista;
    this.mesa1.listaProductosCobrados = [];


    this.mesaService.postNuevaMesa(this.mesa1);
    this.mesas.push(this.mesa1);

    this.lista = [];
    this.mesa1 = new Mesa();
    this.mesaform =  this.fb.group({
      numeroMesa: new FormControl('', [Validators.required]),
      productoId: new FormControl(),
      detalleMesa: new FormControl()
    });
    this.verForm = !this.verForm;
    this.verOcultar = "Ver";
  }
  


/* ----------------------------------------------------------------------------------------------*/




  /*
    * VerOcultarFormulario2 muestra u oculta el furmulario para agregar nuevos productos a una mesa
    * VerOcultarFormulario2 cambia el valor de la variable booleana verForm2 para mostrar/ocultar el formulario
    * Ademas actualiza la variable "this.mesas"
    * No recibe parametros
    * No retorna ningun tipo
  */
  verOcutarFormulario2(){
    if(this.verForm2) {
      this.verForm2 = !this.verForm2;
      this.verOcultar2 = "Ver";
    }
    else {
      this.verForm2 = !this.verForm2;
      this.verOcultar2 = "Ocultar";
      this.vermesass();
    }
  }

  /*
    * FUNCION seleccionarMesa
    * Carga la variable "mesa1" para poder agregar mas productos a la  mesa
    * "mesa1" sera la mesa que se envia al servidor para poder la mesa
    * No recibe parametros.
    * No tiene retorno.
  */
  seleccionarMesa(){
    this.mesa1 = new Mesa();
    this.lista = [];
    for(let i = 0; i < this.mesas.length; i++) {
      if(this.numeroMesa.value == this.mesas[i].numero_mesa){
        this.mesa1 = this.mesas[i];
        break;
      }
    }
  }

  /*
    * FUNCION actualizarMesa
    * Actualiza una mesa con mas productos 
    * Envia al servidor la variable "mesa1"
    * No recibe parametros.
    * No tiene retorno.
  */
  actulaizarMesa(){
    this.mesa1.listaProductos = this.lista.concat(this.mesa1.listaProductos);
    for(let i = 0; i < this.lista.length; i++){
      this.mesa1.precio_total = this.mesa1.precio_total + this.lista[i].precio;
    }
    this.mesaService.postActualizar(this.mesa1);
    this.mesaform =  this.fb.group({
      numeroMesa: new FormControl('', [Validators.required]),
      productoId: new FormControl(),
      detalleMesa: new FormControl()
    });
    this.lista = [];
    this.mesa1 = new Mesa();
    this.verForm2 = !this.verForm2;
    this.verOcultar2 = "Ver";
  }






/* ----------------------------------------------------------------------------------------------*/



  /*
    * VerOcultarFormulario3 muestra u oculta el furmulario para cobrar un producto o mas productos
    * VerOcultarFormulario3 cambia el valor de la variable booleana verForm3 para mostrar/ocultar el formulario
    * Ademas actualiza la variable "this.mesas"
    * No recibe parametros
    * No retorna ningun tipo
  */
  verOcutarFormulario3(){
    if(this.verForm3) {
      this.verForm3 = false;
      this.verOcultar3 = "Ver";
    }
    else {
      this.verForm3 = true;
      this.verOcultar3 = "Ocultar";
      this.vermesass();
    }
  }

  /*
    * FUNCION verUnaMesa
    * Muestra el detalle de una mesa especificada
    * Actualiza la variable mesa1 con los datos de esta mesa
    * La variable "verUnaMesaBool" activa la visualización
    * No recibe parametros
    * No tiene retorno
  */
  verUnaMesa(){
    this.verUnaMesaBool = !this.verUnaMesaBool;
    this.lista = [];
    for( this.numero = 0; this.numero < this.mesas.length; this.numero++) {
      if(this.numeroMesa.value == this.mesas[this.numero].numero_mesa){
        this.mesa1 = this.mesas[this.numero];
        break;
      }
    }
  }

  /*
    * FUNCION cobrarProducto   this.mesaService.postNuevaMesa(this.mesa1);
    * Agrega un producto a la lista de productos cobrados
    * Reutiliza la variable "lista" y elimina ese productos de la lista de productos de la mesa
    * Recorre la lista de productos de la mesa seleccionada anteriormente para encontrar el producto específico
    * Reajusta el precio temporal de la mesa
    * Recibe como parametro el id del producto
    * No tiene retorno
  */
  cobrarProducto($event: any){
    for(let i: number = 0; i < this.mesas[this.numero].listaProductos.length; i++){
      if(this.mesas[this.numero].listaProductos[i].id == $event.target.value){
        this.mesas[this.numero].precio_temporal = this.mesas[this.numero].precio_temporal + this.mesas[this.numero].listaProductos[i].precio;
        this.mesas[this.numero].listaProductosCobrados.push(this.mesas[this.numero].listaProductos[i]);
        this.mesas[this.numero].listaProductos.splice(i,1);

        this.mesaService.postNuevaMesa(this.mesas[this.numero]);

        break;
      }
    }
  }

  /*
    * FUNCION deshacerCambioCobrarProducto
    * Elimina un producto a la lista de productos cobrados
    * Reutiliza la variable "lista" y elimina ese productos de la variable "lista" de productos cobrados
    * Recorre la lista de productos cobrados para encontrar el producto específico
    * Agrega el producto a la lista de productos de la mesa
    * Reajusta el precio temporal de la mesa
    * Recibe como parametro el id del producto
    * No tiene retorno
  */
  deshacerCambioCobrarProducto($event: any){
    for(let i: number = 0; i < this.mesas[this.numero].listaProductosCobrados.length; i++){
      if(this.mesas[this.numero].listaProductosCobrados[i].id == $event.target.value){
        this.mesas[this.numero].precio_temporal = this.mesas[this.numero].precio_temporal - this.mesas[this.numero].listaProductosCobrados[i].precio;
        this.mesa1.listaProductos.push(this.mesas[this.numero].listaProductosCobrados[i]);
        this.mesas[this.numero].listaProductosCobrados.splice(i,1);


        this.mesaService.postNuevaMesa(this.mesas[this.numero]);

        break;
      }
    }
  }

  /*
    * FUNCION cerrarMesa
    * Envia una mesa al servidor para ser guardada en la base de datos.
    * Carga la variable "mesa1" con todos sus atributos correspondientes 
    * La lista de produstos de productos van a estar cargadas en la variable "listaProductos"
    * La lista "listaProductosCobrados" se igualara a vacia para lograr que la lista de productos quede en la listaProductos de la mesa 
    * Recibe como parametro el id del producto
    * No tiene retorno
  */
  cerrarMesa(){
    this.mesa1.estado = false;
    this.mesa1.precio_temporal = 0;
    this.mesa1.listaProductos = this.mesa1.listaProductos.concat(this.mesa1.listaProductosCobrados);
    this.mesa1.listaProductosCobrados = [];
    this.mesaService.postActualizar(this.mesa1);
    for(let i = 0; i < this.mesas.length; i++) {
      if(this.numeroMesa.value == this.mesas[i].numero_mesa){
        this.mesas.splice(i, 1);
        break;
      }
    }
    this.lista = [];
    this.numeroMesa = new FormControl();
    this.verUnaMesaBool = !this.verUnaMesaBool;
    this.mesa1 = new Mesa();
    this.verForm3 = !this.verForm3;
    this.verOcultar3 = "Ver";
  }


}
