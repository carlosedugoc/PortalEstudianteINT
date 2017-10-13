import { Injectable } from '@angular/core';
import { Servicio } from "../../shared/models/servicio";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AdministracionService {

  constructor(private http:Http) { }

  private servicios:Servicio[] = [{
    "id": 1,
    "nombre": "Actualizacion de datos",
    "url": "URLservicio1",
    "habilitar": true,
    "idCategoria": 1,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 1,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 2,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 3,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 4,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 5,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 6,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 7,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 8,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 9,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
}, {
    "id": 2,
    "nombre": "Agendamiento de Servicios Especiales",
    "url": "URLservicio2",
    "habilitar": true,
    "idCategoria": 1,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 12,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 13,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 14,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 15,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 16,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 17,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 18,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 19,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 20,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
}, {
    "id": 3,
    "nombre": "Asistencia a clase",
    "url": "URLservicio3",
    "habilitar": true,
    "idCategoria": 1,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 21,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 22,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 23,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 24,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 25,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 26,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 27,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 28,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 29,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
}, {
    "id": 4,
    "nombre": "Biblioteca",
    "url": "URLservicio4",
    "habilitar": true,
    "idCategoria": 2,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 30,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 31,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 32,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 33,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 34,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 35,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 36,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 37,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 38,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
}, {
    "id": 5,
    "nombre": "Bloqueos",
    "url": "URLservicio5",
    "habilitar": true,
    "idCategoria": 3,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 39,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 40,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 41,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 42,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 43,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 44,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 45,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 46,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 47,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
}, {
    "id": 6,
    "nombre": "Bolsa de Empleo",
    "url": "URLservicio6",
    "habilitar": true,
    "idCategoria": 4,
    "nombreCategoria": "Consulta Academica",
    "datos": [{
                                    "id": 48,
                                    "id_item": 1,
                                    "nombre_item": "Presencial",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 49,
                                    "id_item": 2,
                                    "nombre_item": "Virtual",
                                    "id_tipo": 1,
                                    "nombre_tipo": "Modalidad",
                                    "dato": true
                    }, {
                                    "id": 50,
                                    "id_item": 3,
                                    "nombre_item": "Pregrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 51,
                                    "id_item": 4,
                                    "nombre_item": "Postgrado",
                                    "id_tipo": 2,
                                    "nombre_tipo": "Nivel Academico",
                                    "dato": true
                    }, {
                                    "id": 52,
                                    "id_item": 5,
                                    "nombre_item": "Inactivo",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 53,
                                    "id_item": 6,
                                    "nombre_item": "Egresado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 54,
                                    "id_item": 7,
                                    "nombre_item": "Graduado",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 55,
                                    "id_item": 8,
                                    "nombre_item": "Acudiente",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }, {
                                    "id": 56,
                                    "id_item": 9,
                                    "nombre_item": "Inscrito",
                                    "id_tipo": 3,
                                    "nombre_tipo": "Tipo Usuario",
                                    "dato": true
                    }
    ]
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
