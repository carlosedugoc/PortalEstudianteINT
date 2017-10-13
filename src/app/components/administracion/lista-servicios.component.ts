import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Nivel } from "../../../shared/models/nivel";
import { Modalidad } from "../../../shared/models/modalidad";
import { Estados } from "../../../shared/models/estados";
import { Servicio } from "../../../shared/models/servicio";

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {
  @Input('total_modalidades') total_modalidades:number
  @Input('total_niveles') total_niveles:number
  @Input('total_estados') total_estados:number
  @Input('modalidades') modalidades:Modalidad[]
  @Input('estados') estados:Estados[]
  @Input('niveles') niveles:Nivel[]
  @Input('servicios') servicios:Servicio[]
  
  constructor() { }

  ngOnInit() {
  }

}
