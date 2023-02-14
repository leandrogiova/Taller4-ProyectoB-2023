import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesasPrincipalComponent } from './mesas-principal/mesas-principal.component';
import { ProductosPrincipalComponent } from './productos-principal/productos-principal.component';


const routes: Routes = [
  {path: 'home', component: MesasPrincipalComponent},
  {path: 'productos', component: ProductosPrincipalComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},  // cuando no se le especifica nada entra en home
  {path: '**', component: Error}  // cuando no matchea con nada entra en error 404 - no encontrado
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
