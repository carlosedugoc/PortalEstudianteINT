import { Component, Input, OnChanges } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
import { Nivel } from "../../../shared/models/nivel";
import { Modalidad } from "../../../shared/models/modalidad";
import { Estados } from "../../../shared/models/estados";
import { Item } from "../../../shared/models/item";
import { UrlServicios } from "../../../shared/models/url-servicios";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdministracionService]
})
export class AdministracionComponent implements OnChanges {
  @Input('universidad') universidad = null;
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
  public mostrar_tabla:boolean

  constructor(private adminService:AdministracionService,
              private http: Http) { 
                this.loading = false
                this.mostrar_tabla = false 
  }

  cargar_datos(IdUniversidad:string){
    this.url_servicio = undefined
    if (IdUniversidad == "0"){
      this.mostrar_tabla = false 
      return
    }
    this.loading = true
    // this.getServicios(IdUniversidad).then(()=>{
      this.getToken().then(()=>{
        this.getUniversidad().then(()=>{
          for(let item of this.url_servicios){
            if (item.Codigo == IdUniversidad){
              this.url_servicio = item
              return this.url_servicio
            }
          }
          return this.url_servicio
        }).then(()=>{
          if (!this.url_servicio){
            this.loading = false 
            return Promise.reject({'mensaje':'La Universidad no se encuentra parametrizada'})
          }
          this.getTitulos(IdUniversidad).then(()=>{
            this.loading= false
            this.mostrar_tabla = true 
          }).catch((err)=>{
            if(err.status == 401){
              console.log('Credencial Inválida')
              localStorage.removeItem('token')
              this.cargar_datos(IdUniversidad)
            }else{
              console.error('Se ha producido un error de conexión')
            }
          })
        }).catch((error)=>{
          this.loading= false
          this.mostrar_tabla = false 
          console.error(error)
        })
      })
    // })
  }
  
  getServicios(IdUniversidad:String){
    const promesa = new Promise((resolve,reject)=>{
      this.total_niveles = 0
      this.servicios = this.adminService.getServicios(IdUniversidad)
      if (!this.servicios || this.servicios.length == 0){reject()}
      resolve()
    })
    return promesa
  }

  getTitulos(IdUniversidad:string){
    const promesa = new Promise((resolve,reject)=>{
      this.getModalidades().then(()=>{
        this.getNiveles().then(()=>{
          this.getEstados().then(()=>{
            this.showData(IdUniversidad)
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

  ngOnChanges(){
    if(this.universidad && this.universidad != "0"){
      this.cargar_datos(this.universidad)
    }
  }

 //public faltantes:Item[]
 public faltantes:any[] 

  showData(IdUniversidad){
    this.faltantes = []  
    var itemsOrdenados:Item[]
    this.servicios = this.adminService.getServicios(IdUniversidad)
    if (this.modalidades && this.modalidades.length > 0){
      for (var idx = 0; idx < this.servicios.length; idx++) {
        itemsOrdenados = []
        for(let modalidad of this.modalidades){
            let items:Item[]
            items = this.servicios[idx].datos
            for (var index = 0; index < items.length; index++) {
              if (modalidad.description = items[index].nombre_item){
                itemsOrdenados.push(items[index])
                break
              }
//              this.faltantes.push(items[index])
              //toca crear un objeto para guardar las modalidades faltantes
              this.faltantes.push({
                id_tipo:1,
                nombre_tipo:"Modalidad",
                nombre_item:modalidad.description,
                id_item:modalidad.modalityId,
                id_universidad:IdUniversidad
              })
            } 
          }
          this.servicios[idx].datos = itemsOrdenados
        }
      }

      if (this.niveles && this.niveles.length > 0){
        itemsOrdenados = []
        for (var idx = 0; idx < this.servicios.length; idx++) {
          for(let nivel of this.niveles){
              let items:Item[]
              items = this.servicios[idx].datos
              for (var index = 0; index < items.length; index++) {
                if (nivel.description = items[index].nombre_item){
                  itemsOrdenados.push(items[index])
                  break
                }
                //this.faltantes.push(items[index])
                this.faltantes.push({
                  id_tipo:2,
                  nombre_tipo:"Nivel",
                  item:nivel.description,
                  id_item:nivel.levelId,
                  id_universidad:IdUniversidad
                })
              } 
            }
            this.servicios[idx].datos = itemsOrdenados
          }
        }

      if (this.estados && this.estados.length > 0){
        for (var idx = 0; idx < this.servicios.length; idx++) {
          itemsOrdenados = []
          for(let estado of this.estados){
              let items:Item[]
              items = this.servicios[idx].datos
              for (var index = 0; index < items.length; index++) {
                if (estado.description = items[index].nombre_item){
                  itemsOrdenados.push(items[index])
                  break
                }
                //this.faltantes.push(items[index])
                this.faltantes.push({
                  id_tipo:2,
                  nombre_tipo:"Estado",
                  item:estado.description,
                  id_item:estado.statusId,
                  id_universidad:IdUniversidad
                })
              } 
            }
            this.servicios[idx].datos = itemsOrdenados
          }
        }

        if (this.faltantes.length>0) {
          console.log('faltantes',this.faltantes)
          this.saveItem()
        }
  }

  saveItem(){
    //this.showData()
  }

}
