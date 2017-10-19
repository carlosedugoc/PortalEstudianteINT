import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Servicio } from "../../../shared/models/servicio";
import { AdministracionService } from "../../../shared/services/administracion.service";

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html'
})
export class ListaServiciosComponent {

  @Input('total_modalidades') total_modalidades: number
  @Input('total_niveles') total_niveles:number
  @Input('total_estados') total_estados:number
  @Input('servicios') servicios:Servicio[]
  @Input('tipos') tipos:any[]
  
  constructor(private adminService:AdministracionService) { }

  updateItem(id:number,estado:boolean){
    var servicios:any
    servicios = localStorage.getItem('servicios')
    console.log(JSON.parse(servicios).UrlUpdateServicios)

    this.adminService.actualizaItem({id:id,estado:estado},JSON.parse(servicios).UrlUpdateServicios).subscribe(data =>{
      
    })
    // console.log('evento',event, 'item',estado)
  }

}
