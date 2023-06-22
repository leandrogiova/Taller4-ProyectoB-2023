import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesasPrincipalComponent } from './mesas-principal/mesas-principal.component';

import { ProductosPrincipalComponent } from './productos-principal/productos-principal.component';
import { VerListaProductosComponent } from './productos-principal/ver-lista-productos/ver-lista-productos.component';
import { ModificarListaProductosComponent } from './productos-principal/modificar-lista-productos/modificar-lista-productos.component';
import { ResumenesComponent } from './resumenes/resumenes.component';

import { ModalEliminarProductoComponent } from './productos-principal/modificar-lista-productos/modal-eliminar-producto/modal-eliminar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    MesasPrincipalComponent,
    ProductosPrincipalComponent,
    VerListaProductosComponent,
    ModificarListaProductosComponent,
    ResumenesComponent,
    ModalEliminarProductoComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
