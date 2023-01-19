import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesasPrincipalComponent } from './mesas-principal/mesas-principal.component';

import { ProductosPrincipalComponent } from './productos-principal/productos-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    MesasPrincipalComponent,
    ProductosPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
