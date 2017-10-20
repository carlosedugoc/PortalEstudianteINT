import { Component, Input, OnChanges } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
import { Status } from "../../../shared/models/status";
import { Level } from "../../../shared/models/level";
import { Modality } from "../../../shared/models/modality";
import { Item } from "../../../shared/models/item";
import { UrlServicios } from "../../../shared/models/url-servicios";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  providers: [AdministracionService]
})
export class AdministracionComponent implements OnChanges {

  @Input('universidad') universidad = null;

  public servicios:Servicio[]
  public modality:Modality[] = []
  public levels:Level[] = []
  public status: Status[] = []
  public token;
  public errorMessage:string 
  public total_modalidades:number
  public total_niveles:number
  public total_estados:number
  public url_servicios_universidad:UrlServicios[]
  public url_servicio:UrlServicios
  public loading:boolean
  public mostrar_tabla:boolean
  public rol:string
  public url_Servicios_backend:any
  public tipos:any[]

  constructor(private adminService:AdministracionService,
              private http: Http) { 
                this.loading = false
                this.mostrar_tabla = false 
  }

  cargar_datos(IdUniversidad:string){
    this.serv = false
    this.url_servicio = undefined
    if (IdUniversidad == "0"){
      this.mostrar_tabla = false 
      return
    }
    this.loading = true
      this.getToken().then(()=>{
        this.getUrlsServicios().then(()=>{
          for(let item of this.url_servicios_universidad){
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
            this.getServicios(IdUniversidad).then(()=>{
              this.procesarInformacion(IdUniversidad)
              this.loading= false
              this.mostrar_tabla = true 
              return Promise.resolve()
            })
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
  }



  public serv:boolean = false
  getServicios(IdUniversidad:String){
    const promesa = new Promise((resolve,reject)=>{
      this.servicios = []
      this.adminService.getServicios(IdUniversidad,this.url_Servicios_backend.UrlGetServicios).subscribe(servicios=>{
        this.servicios = servicios
        if (this.servicios.length == 0){
          this.serv = true
        }else{
          this.serv = false
        }
        resolve()
      },error =>{
        reject(error)
      })
    })
    return promesa
  }

  procesarInformacion(IdUniversidad:String){
    this.tipos = []
    for(let mod of this.modality ){
      this.tipos.push({
        id_item:mod.modalityId,
        description:mod.description,
        tipo:'Modalidad',
        id_tipo:1
      })
    }

    for(let lev of this.levels ){
      this.tipos.push({
        id_item:lev.levelId,
        description:lev.description,
        tipo:'Nivel',
        id_tipo:2
      })
    }

    for(let sta of this.status ){
      this.tipos.push({
        id_item:sta.statusId,
        description:sta.description,
        tipo:'Estado',
        id_tipo:3
      })
    }

    this.faltantes = []  
    let encontrado:boolean = false

    for (var idx = 0; idx < this.servicios.length; idx++) {
      var itemsOrdenados:Item[] = []
      for(let tipo of this.tipos){
          let items:Item[]
          encontrado = false
          items = this.servicios[idx].datos
          for (var index = 0; index < items.length; index++) {
            if (tipo.description.toUpperCase() == items[index].nombre_item.toUpperCase()){
              itemsOrdenados.push(items[index])
              encontrado = true 
              break
            }
          }
          if (!encontrado){
            this.faltantes.push({
              id_tipo:tipo.id_tipo,
              nombre_item:tipo.description,
              codigo_item:tipo.id_item,
              codigo_universidad:IdUniversidad
            })
          }
        }
        if(idx == 0 && this.faltantes.length > 0){
          this.saveItems(this.faltantes,IdUniversidad)
          console.log('faltantes',this.faltantes)
          break
        }else{
          if(itemsOrdenados.length>0){ this.servicios[idx].datos = itemsOrdenados }
        }
      }



      let encont:boolean = false
      let eliminados:any[] = []

      for (let servicio of this.servicios){
        for(let item of servicio.datos){
          encont = false
          for (let tipo of this.tipos){
            if (item.nombre_item.toUpperCase() == tipo.description.toUpperCase()){
              encont=true
              break
            }
          }
          if(!encont){
            eliminados.push(item)
          }
        }
      }


      console.log(eliminados)

      console.log(this.servicios)
  }

  getTitulos(IdUniversidad:string){
    const promesa = new Promise((resolve,reject)=>{
      this.getModalidades().then(()=>{
        this.getNiveles().then(()=>{
          this.getEstados().then(()=>{
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
      this.levels = []
      this.total_niveles = 0
      this.adminService.getTitulos(this.token, this.url_servicio.ServicioNivel).subscribe(niveles=>{
        this.levels = niveles.json()
        this.total_niveles = this.levels.length
        resolve(niveles)
      },error=>{
        reject(error)
      })
    })
    return promesa
  }

  getModalidades(){
    const promesa = new Promise((resolve,reject)=>{
      this.modality = []
      this.total_modalidades = 0
      this.adminService.getTitulos(this.token, this.url_servicio.ServicioModalidad).subscribe(modalidades=>{
        this.modality = modalidades.json()
        this.total_modalidades = this.modality.length
        resolve(modalidades)
      },error=>{
        reject(error)
      })
    })
    return promesa
  }

  getEstados(){
    const promesa = new Promise((resolve,reject)=>{
      this.status = []
      this.total_estados = 0
      this.adminService.getTitulos(this.token,this.url_servicio.ServicioEstado).subscribe(estados=>{
        this.status = estados.json()
        this.status.push({
          statusId :'AC',
          description: 'Acudiente',
          statusType:""
        })
        this.total_estados = this.status.length
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
  
  getUrlsServicios(){
    const promesa = new Promise((resolve,reject)=>{
      this.http.get("assets/config.json").subscribe((success) =>  {
        this.url_servicios_universidad = JSON.parse(success['_body']).universidades
        this.url_Servicios_backend = JSON.parse(success['_body']).servicios
        localStorage.setItem('servicios',JSON.stringify(this.url_Servicios_backend))
        resolve(this.url_servicios_universidad)
      });
    })
    return promesa
  }

  // getUniversidades(){
  //   const promesa = new Promise((resolve,reject)=>{
  //     this.adminService.getUniversidades(this.url_Servicios_backend.UrlGetUniversidades).subscribe(estados=>{
  //       this.status = estados.json()
  //       this.total_estados = this.status.length
  //       console.log('estados', estados.json())
  //       console.log('estados3', this.status)
  //       resolve(estados)
  //     },error=>{
  //       reject(error)
  //     })
  //   })
  //   return promesa
  // }

  ngOnChanges(){
    let univ:string = this.rol
    this.rol = localStorage.getItem('rol')
    if (univ != this.rol){
      var codUniversidad :string
      switch (this.rol) {
        case 'AA':
          codUniversidad = '1';
          break;
        case 'Poli':
          codUniversidad = '2'
          break;
        default:
          codUniversidad = '0'
      }
      this.cargar_datos(codUniversidad)
    }
  }

public faltantes:any[] 
public faltantesMensaje:any[]
  saveItems(faltantes:any[], IdUniversidad){
    this.faltantesMensaje = faltantes
    document.getElementById('openModalButton').click()
    console.log('SaveItems - faltantes',faltantes,'url',this.url_Servicios_backend)
    this.adminService.saveItems(faltantes,this.url_Servicios_backend.UrlUpdateServicios).subscribe(data=>{
      this.getServicios(IdUniversidad).then(()=>{
        this.procesarInformacion(IdUniversidad)
      })
    })

  }

}
