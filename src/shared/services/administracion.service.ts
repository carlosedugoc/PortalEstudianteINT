import { Injectable } from '@angular/core';
import { Servicio } from "../../shared/models/servicio";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AdministracionService {

  constructor(private http:Http) { }

  getServicios(IdUniversidad:String, url:string ){
    return this.http.get(url + IdUniversidad).map(servicios=> servicios.json())
  }


  getUniversidades(url:string ){
    return this.http.get(url).map(servicios=> servicios.json())
  }

  getTitulos(token:string, url:string ){
    let headers = new Headers({
      'authorization':`Bearer ${token}`
    });
    return this.http.get(url,{headers})
        .map(respuesta=>{
          return respuesta
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


actualizaItem( item:any, url:string  ){
      console.log('item',JSON.stringify( item ))
      let body = JSON.stringify( item );

      let headers = new Headers({
        'Content-Type':'application/json'
      });
  
      return this.http.put(  url , body, { headers }  )
            .map( res=>{
              return res;
            },error=>{
              console.log('error',error)
            })
    }
  
saveItems( items:any[], url:string ){
  
  let body = JSON.stringify( items );
  let headers = new Headers({
    'Content-Type':'application/json'
  });

  return this.http.post(url, body, { headers }  )
        .map( res=>{
          console.log(res.json());
          return res.json();
        })
}

  

}
