import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesaService } from '../services/mesa.service';

@Component({
  selector: 'app-resumenes',
  templateUrl: './resumenes.component.html',
  styleUrls: ['./resumenes.component.css']
})
export class ResumenesComponent {

  resumenesForm: FormGroup;

  constructor(private fb:FormBuilder, private mesaService: MesaService){
    this.resumenesForm = this.fb.group({
      fecha1: new FormControl('', [Validators.required]),
      fecha2: new FormControl('', [Validators.required]) 
    });
  
  }


  pedirResumenes(){
//    this.mesa1.fecha = new Date();
//    let fecha1: Date;
//    let fecha2: Date;
    let fechas: Date[] = [];
  
    fechas[0] = this.resumenesForm.controls['fecha1'].value;
    fechas[1] = this.resumenesForm.controls['fecha1'].value;
    console.log("fechas::",fechas);
    this.mesaService.pedirResumen(fechas);


  } 


}
