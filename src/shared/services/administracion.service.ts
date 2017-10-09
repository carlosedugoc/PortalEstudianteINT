import { Injectable } from '@angular/core';
import { Servicio } from "../../shared/models/servicio";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AdministracionService {

  constructor(private http:Http) { }

  private servicios:Servicio[] = [
    {
      id:1,
      nombre:"Actualización de datos",
      tipo:1
    },
    {
      id:2,
      nombre:"Agendamiento servicio especiales",
      tipo:1
    },
    {
      id:3,
      nombre:"Asistencia a clase",
      tipo:1
    },
    {
      id:4,
      nombre:"Biblioteca",
      tipo:1
    },
    {
      id:5,
      nombre:"Bloqueos (Retenciones)",
      tipo:1
    },
    {
      id:6,
      nombre:"Bolsa de empleo",
      tipo:1
    },
    {
      id:7,
      nombre:"Calendario Académico",
      tipo:1
    },
    {
      id:8,
      nombre:"Calificaciones Periodo en curso",
      tipo:2
    },
    {
      id:9,
      nombre:"Cancelación de asignaturas (Según reglamento estudiantil)",
      tipo:2
    },
    {
      id:10,
      nombre:"Caracterización estudiante solicitud de beca",
      tipo:3
    }
  ]

getServicios(){
  return this.servicios;
}

getModalidades(token:string){
  let url = 'https://apis.qailumno.com/sis/poli/v1/api/modalities'
      let headers = new Headers({
        'authorization':`Bearer ${token}`
      });
      return this.http.get(url,{headers}).map(respuesta=>respuesta.json())
}


getNiveles(token:string ){
  let url = 'https://apis.qailumno.com/sis/fuaa/v1/api/academicLevels'

    let headers = new Headers({
      'authorization':`Bearer ${token}`
    });
    return this.http.get(url,{headers}).map(respuesta=>respuesta.json())
}

getToken(){
  let url = 'https://apis.qailumno.com/token'

  let urlSearchParams = new URLSearchParams();
  urlSearchParams.append('grant_type','client_credentials');

  let body = urlSearchParams.toString()

  let headers = new Headers({
    'authorization':'Basic eHJQYnpWYXB0Vk42OTF0QlJ0eWVvbGlCbXBrYTp6N3o0NXozWFdwR3RQVFJUU0FfUXVEaUhpSVFh',
    'Content-Type':'application/x-www-form-urlencoded'
  });
  return this.http.post(url,body,{headers}).map(respuesta=>respuesta.json()['access_token'])
}



}
