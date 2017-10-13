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
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Modalidad Académica",
          id_tipo:1,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:2,
      nombre:"Agendamiento servicio especiales",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Modalidad Académica",
          id_tipo:1,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:3,
      nombre:"Asistencia a clase",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Modalidad Académica",
          id_tipo:1,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:4,
      nombre:"Biblioteca",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Modalidad Académica",
          id_tipo:1,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:5,
      nombre:"Bloqueos (Retenciones)",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Modalidad Académica",
          id_tipo:1,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:6,
      nombre:"Bolsa de empleo",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Nivel Académico",
          id_tipo:2,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:7,
      nombre:"Calendario Académico",
      tipo:1,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Nivel Académico",
          id_tipo:2,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:8,
      nombre:"Calificaciones Periodo en curso",
      tipo:2,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Nivel Académico",
          id_tipo:2,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:9,
      nombre:"Cancelación de asignaturas (Según reglamento estudiantil)",
      tipo:2,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Tipo de Usuario",
          id_tipo:3,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    },
    {
      id:10,
      nombre:"Caracterización estudiante solicitud de beca",
      tipo:3,
      datos:[
        {
          id:1,
          nombre_Item:"",
          id_item:1,
          nombre_tipo:"Tipo de Usuario",
          id_tipo:3,
          dato:true
        }
      ],
      url:"",
      habilitar:true
    }
  ]

getServicios(IdUniversidad:String){
  return this.servicios;
}

getTitulos(token:string, url:string ){
  let headers = new Headers({
    'authorization':`Bearer ${token}`
  });
  let fecha = new Date
  //console.log("Esta es la respuesta del servicio", "antes", url,fecha.getSeconds())
  return this.http.get(url,{headers})
      .map(respuesta=>{
        //console.log("Esta es la respuesta del servicio", respuesta.json(), url,fecha.getSeconds())
        return respuesta.json()
      })
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
