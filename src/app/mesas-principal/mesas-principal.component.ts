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
  verUnaMesaBool: boolean;
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
    this.verUnaMesaBool = false;
    this.verForm2 = false;


    this.mesaform =  this.fb.group({
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
  //la "lista" = listaProductosCobrados
  //la lista de productos de la mesa son los productos sin cobrar
//cuando se cierra la mesa completa todos los productos deben qudar en la lista de productos de la mesa
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
    this.mesa1.numero_mesa = this.mesaform.controls['numeroMesa'].value;
    this.mesa1.estado = true;
    this.mesa1.fecha = this.mesaform.controls['fecha1Mesa'].value;
    this.mesa1.detalle = this.mesaform.controls['detalleMesa'].value;
    this.mesa1.forma_pago = "Efectivo";
    this.mesa1.precio_temporal = 0;
    this.mesa1.precio_total = 0;
    for(let i = 0; i < this.lista.length; i++){
      this.mesa1.precio_total = this.mesa1.precio_total + this.lista[i].precio;
    }
    this.mesa1.listaProductos = this.lista;
    this.mesa1.listaProductosCobrados = [];

    console.log("Enviando mesa1: ", this.mesa1);
    this.mesaService.postNuevaMesa(this.mesa1);
    this.mesas.push(this.mesa1);

    this.lista = [];
    this.mesaform =  this.fb.group({
      numeroMesa: new FormControl('', [Validators.required]),
      fecha1Mesa: new FormControl('', [Validators.required]),
      productoId: new FormControl(),
      detalleMesa: new FormControl()
    });
    this.verForm = !this.verForm;
    this.verOcultar = "Ver";
    this.vermesass();
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
    console.log("this.lista", this.lista, "this.mesa1", this.mesa1);
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
    for(let i = 0; i < this.mesas.length; i++) {
      if(this.numeroMesa.value == this.mesas[i].numero_mesa){
        this.mesa1 = this.mesas[i];
        break;
      }
    }
  }



  /*
  * FUNCION cobrarProducto
  * Agrega un producto a la lista de productos cobrados
  * Reutiliza la variable "lista" y elimina ese productos de la lista de productos de la mesa
  * Recorre la lista de productos de la mesa seleccionada anteriormente para encontrar el producto específico
  * Reajusta el precio temporal de la mesa
  * Recibe como parametro el id del producto
  * No tiene retorno
  */
  cobrarProducto($event: any){
    for(let i: number = 0; i < this.mesa1.listaProductos.length; i++){
      if(this.mesa1.listaProductos[i].id == $event.target.value){
        this.mesa1.precio_temporal = this.mesa1.precio_temporal + this.mesa1.listaProductos[i].precio;
        this.lista.push(this.mesa1.listaProductos[i]);
        this.mesa1.listaProductos.splice(i,1);
        break;
      }
    }
    //la lista es la lista de productos cobrados
    this.mesa1.listaProductosCobrados = this.lista;
    this.mesaService.postActualizar(this.mesa1);

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
    for(let i: number = 0; i < this.lista.length; i++){
      if(this.lista[i].id == $event.target.value){
        this.mesa1.precio_temporal = this.mesa1.precio_temporal - this.lista[i].precio;
        this.mesa1.listaProductos.push(this.lista[i]);
        this.lista.splice(i,1);
        break;
      }
    }
    this.mesa1.listaProductosCobrados = this.lista;
    this.mesaService.postActualizar(this.mesa1);
  }



  /*
  * FUNCION actualizarMesaModificada
  * Envia una mesa al servidor para ser guardada en la base de datos.
  * Carga la variable "mesa1" con todos sus atributos correspondientes 
  * La lista de produstos de productos van a estar cargadas en la variable "listaProductos"
  * La lista "listaProductosCobrados" se igualara a vacia para lograr que la lista de productos quede en la listaProductos de la mesa 
  * Recibe como parametro el id del producto
  * No tiene retorno
  */
  actualizarMesaModificada(){
    this.mesa1.estado = false;
    this.mesa1.precio_temporal = 0;
    
    this.mesa1.forma_pago = "Efectivo";
    
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
  }










}
