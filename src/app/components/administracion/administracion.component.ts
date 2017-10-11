import { Component } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
import { Nivel } from "../../../shared/models/nivel";
import { Modalidad } from "../../../shared/models/modalidad";
import { Estados } from "../../../shared/models/estados";
import { UrlServicios } from "../../../shared/models/url-servicios";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdministracionService]
})
export class AdministracionComponent {
  public servicios:Servicio[]
  public niveles:Nivel[]
  public modalidades:Modalidad[]
  public estados:Estados[]
  public token;
  public errorMessage:string 
  public total_modalidades:number
  public total_niveles:number
  public total_estados:number
  public url_servicios:UrlServicios[]
  public url_servicio:UrlServicios
  public loading:boolean
  public rol:number

  constructor(private adminService:AdministracionService,
              private http: Http) { 
    this.loading = true
  }

  cargar_datos(IdUniversidad:String){
    if (IdUniversidad == "0"){
      this.loading = true 
      return
    }
    this.servicios = this.adminService.getServicios()
    this.loading = true 
    this.getToken().then(()=>{
      this.getUniversidad().then(()=>{
        for(let item of this.url_servicios){
          if (item.Codigo == IdUniversidad){
            this.url_servicio = item
            return this.url_servicio
          }
        }
      }).then(()=>{
        this.getTitulos().then(()=>{
          console.log('ok')
          this.loading= false
        }).catch((err)=>{
          if(err.status == 401){
            console.log('Credencial Inválida')
            localStorage.removeItem('token')
            this.cargar_datos(IdUniversidad)
          }
        })
      })
    })
  }

  getTitulos(){
    const promesa = new Promise((resolve,reject)=>{
      this.getModalidades().then(()=>{
        this.getNiveles().then(()=>{
          this.getEstados().then(()=>{
            console.log('ok')
            this.loading= false
            resolve()
          }).catch((error)=>{
            reject(error)
          })
        }).catch((error)=>{
          reject(error)
        })
      }).catch((error)=>{
        reject(error)
      })
    })
    return promesa
  }

  getNiveles(){
    const promesa = new Promise((resolve,reject)=>{
      this.total_niveles = 0
      this.adminService.getTitulos(this.token, this.url_servicio.ServicioNivel).subscribe(niveles=>{
        this.niveles = niveles
        this.total_niveles = this.niveles.length
        resolve(niveles)
      },error=>{
        reject(error)
      })
    })
    return promesa
  }

  getModalidades(){
    const promesa = new Promise((resolve,reject)=>{
      this.total_modalidades = 0
      this.adminService.getTitulos(this.token, this.url_servicio.ServicioModalidad).subscribe(modalidades=>{
        this.modalidades = modalidades
        this.total_modalidades = this.modalidades.length
        resolve(modalidades)
      },error=>{
        reject(error)
      })
    })
    return promesa
  }

  getEstados(){
    const promesa = new Promise((resolve,reject)=>{
      this.total_estados = 0
      this.adminService.getTitulos(this.token,this.url_servicio.ServicioEstado).subscribe(estados=>{
        this.estados = estados
        this.total_estados = this.estados.length
        resolve(estados)
      },error=>{
        reject(error)
      })
    })
    return promesa
  }

  getToken(){
    const promesa = new Promise((resolve,reject)=>{
      if (!localStorage.getItem('token')){
        this.adminService.getToken().subscribe(response=>{
          this.token = response
          if(this.token.length <= 0){
            alert("El token no se ha generado correctamente");
          }else{
              localStorage.setItem('token', this.token);
              resolve(this.token)
          }
        },error=>{
          let errorMessage = <any>error;
          if(errorMessage != null){
            this.errorMessage = error.error_description
            console.log(this.errorMessage);
            reject( new Error (this.errorMessage))
          }
        })
      }else{
        this.token = localStorage.getItem('token')
        resolve(this.token)
      }
    })
    return promesa 
}

getUniversidad(){
  const promesa = new Promise((resolve,reject)=>{
    this.http.get("assets/config.json").subscribe((success) =>  {
      this.url_servicios = JSON.parse(success['_body'])
      resolve(this.url_servicios)
    });
  })
  return promesa
}


}
