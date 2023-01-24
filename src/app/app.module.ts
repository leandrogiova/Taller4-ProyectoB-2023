import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesasPrincipalComponent } from './mesas-principal/mesas-principal.component';

import { ProductosPrincipalComponent } from './productos-principal/productos-principal.component';

//https://shecodes.gitbook.io/she-codes-angular/workshop-v.3/avanzado-2

@NgModule({
  declarations: [
    AppComponent,
    MesasPrincipalComponent,
    ProductosPrincipalComponent
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
