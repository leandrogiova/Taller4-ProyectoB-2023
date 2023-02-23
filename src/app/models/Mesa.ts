import { Producto } from "./Producto";


export class Mesa{

    numero_mesa!: number;
    estado!: boolean;
    fecha!: Date;
    precio_temporal!: number;
    precio_total!: number;
    formaDePago!: string;
    detalle!: string;

    listaProductos!: Producto[];
/*
    constructor() {
        this.id = 0;
        this.numero_mesa = 0;
        this.estado = true;
        this.fecha = new Date();
        this.precio_temporal = 0;
        this.precio_total = 0;
        this.formaDePago = "";
        this.detalle = "";

//        this.listaProducto = [];
    }
*/
    constructor(){
    }


}