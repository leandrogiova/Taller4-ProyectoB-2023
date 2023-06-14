import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesasPrincipalComponent } from './mesas-principal/mesas-principal.component';
import { ProductosPrincipalComponent } from './productos-principal/productos-principal.component';
import { VerListaProductosComponent } from './productos-principal/ver-lista-productos/ver-lista-productos.component';
import { ModificarListaProductosComponent } from './productos-principal/modificar-lista-productos/modificar-lista-productos.component';
import { ResumenesComponent } from './resumenes/resumenes.component';


const routes: Routes = [
  {path: 'home', component: MesasPrincipalComponent},
  {path: 'productos', component: ProductosPrincipalComponent},
  {path: 'resumenes', component: ResumenesComponent},
  {path: 'listaProductos', component: VerListaProductosComponent},
  {path: 'modificarListaProductos', component: ModificarListaProductosComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},  // cuando no se le especifica nada entra en home
  {path: '**', component: Error}  // cuando no matchea con nada entra en error 404 - no encontrado
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
