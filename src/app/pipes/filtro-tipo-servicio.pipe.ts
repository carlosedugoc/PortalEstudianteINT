import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from "../../shared/models/servicio";
import { Item } from "../../shared/models/item";

@Pipe({
  name: 'filtroTipoServicio'
})
export class FiltroTipoServicioPipe implements PipeTransform {

  transform(value: Servicio[], tipoConsulta: number): any {
    if (!value){ return }
    let filtro:Item[] = []
    for(let servicio of value){
      for(let tipo of servicio.datos){
        if (tipo.id_tipo == tipoConsulta){
          filtro.push(tipo)
        }
      }
    }
    return filtro;
  }

}
