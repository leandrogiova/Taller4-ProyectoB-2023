import { Producto } from "./Producto";

export class Mesa{
    numero_mesa!: number;
    listaProductos!: Producto[];
    estado!: boolean;
    fecha!: Date;
    precio_temporal!: number;
    precio_total!: number;
    forma_pago!: string;
    productosCobrados!: Producto[];

/*    
    constructor(numero_mesa: number, estado: boolean, fecha: Date, precio_temporal: number, precio_total: number,
        forma_pago: string, listaProductos: Producto[], productosCobrados: Producto[]){
        this.numero_mesa = numero_mesa;
        this.estado = estado;
        this.fecha = fecha;
        this.precio_temporal = precio_temporal;
        this.precio_total = precio_total;
        this.forma_pago = forma_pago;
        this.listaProductos = listaProductos;
        this.productosCobrados = productosCobrados;
    }   
*/
    constructor(){
        
    }


}