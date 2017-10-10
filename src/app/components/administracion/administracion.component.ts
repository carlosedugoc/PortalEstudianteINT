import { Component } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
import { Nivel } from "../../../shared/models/nivel";
import { Modalidad } from "../../../shared/models/modalidad";
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
  public token;
  public errorMessage:string 
  public total_modalidades:number
  public total_niveles:number
  public url_servicios:UrlServicios[]
  private url_servicio:UrlServicios
  private loading:boolean

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
      this.getUrlServicio().then(()=>{
        for(let item of this.url_servicios){
          if (item.Codigo == IdUniversidad){
            this.url_servicio = item
            return this.url_servicio
          }
        }
      }).then(()=>{
        this.total_niveles = 0
        console.log(this.url_servicio)
        this.adminService.getNiveles(this.token, this.url_servicio.ServicioNivel).subscribe(niveles=>{
          this.niveles = niveles
          this.total_niveles = this.niveles.length
        })
        this.total_modalidades  = 0
        this.adminService.getModalidades(this.token,this.url_servicio.ServicioModalidad).subscribe(modalidades=>{
          this.modalidades = modalidades
          this.total_modalidades = this.modalidades.length
        })
        return 
      }).then(()=>{
        this.loading= false
      })
      
    })
  }

  getToken(){
    const promesa = new Promise((resolve,reject)=>{
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
          console.log(error);
          reject( new Error (this.errorMessage))
        }
      })
    })
    return promesa 
}

getUrlServicio(){
  const promesa = new Promise((resolve,reject)=>{
    this.http.get("assets/config.json").subscribe((success) =>  {
      this.url_servicios = JSON.parse(success['_body'])
      resolve(this.url_servicios)
    });
  })
  return promesa
}

}
