import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFaltantes'
})
export class FiltroFaltantesPipe implements PipeTransform {

  transform(value: any[], tipoConsulta: number): any {
    if (!value){ return }
    
    let filtro:any[] = []
    for(let item of value){
      if(item.id_tipo == tipoConsulta){
        filtro.push(item)
      }
    }
    return filtro;
  }

}
