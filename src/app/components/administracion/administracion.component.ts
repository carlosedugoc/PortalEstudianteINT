import { Component, Input, OnChanges } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
// import { Nivel } from "../../../shared/models/nivel";
// import { Modalidad } from "../../../shared/models/modalidad";
// import { Estados } from "../../../shared/models/estados";
import { Status } from "../../../shared/models/status";
import { Level } from "../../../shared/models/level";
import { Modality } from "../../../shared/models/modality";
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
  public modality:Modality[] = []
  public levels:Level[] = []
  public status: Status[] = []
  public token;
  public errorMessage:string 
  public total_modalidades:number
  public total_niveles:number
  public total_estados:number
  public url_servicios:UrlServicios[]
  public url_servicio:UrlServicios
  public loading:boolean
  public mostrar_tabla:boolean
  public rol:string

  constructor(private adminService:AdministracionService,
              private http: Http) { 
                this.loading = false
                this.mostrar_tabla = false 
                console.log(localStorage.getItem('rol'))
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
            // this.getServicios(IdUniversidad).then(()=>{
            //   this.procesarInformacion(IdUniversidad)
            // })
            this.procesarInformacion(IdUniversidad)
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
  
  // getServicios(IdUniversidad:String){
  //   const promesa = new Promise((resolve,reject)=>{
  //     this.total_niveles = 0
  //     this.adminService.getServicios(IdUniversidad).subscribe(servicios=>{
  //       this.servicios = servicios
  //       console.log('servicios',servicios)
  //       resolve()
  //     },error =>{
  //       reject(error)
  //     })
  //   })
  //   return promesa
  // }


  procesarInformacion(IdUniversidad:String){
    var tipos:any[] = []
    for(let mod of this.modality ){
      tipos.push({
        id:mod.modalityId,
        description:mod.description,
        tipo:'Modalidad'
      })
    }

    for(let lev of this.levels ){
      tipos.push({
        id:lev.levelId,
        description:lev.description,
        tipo:'Nivel'
      })
    }

    for(let sta of this.status ){
      tipos.push({
        id:sta.statusId,
        description:sta.description,
        tipo:'Estado'
      })
    }

    console.log('tipo', tipos)


    this.servicios = this.adminService.getServicios(IdUniversidad)
    this.faltantes = []  
    let ok:boolean = false
        var itemsOrdenados:Item[] = []
        if (this.modality && this.modality.length > 0){
          for (var idx = 0; idx < this.servicios.length; idx++) {
            // itemsOrdenados = []
            for(let tipo of tipos){
                let items:Item[]
                ok = false
                items = this.servicios[idx].datos
                for (var index = 0; index < items.length; index++) {
                  if (tipo.description.toUpperCase() == items[index].nombre_item.toUpperCase()){
                    itemsOrdenados.push(items[index])
                    ok = true 
                    break
                  }
                }
                if (!ok){
                  this.faltantes.push({
                    id_tipo:1,
                    nombre_tipo:tipo.tipo,
                    nombre_item:tipo.description,
                    id_item:tipo.id,
                    id_universidad:IdUniversidad
                  })
                }
 
              }
              if(idx == 0 && this.faltantes.length > 0){
                this.saveItem(this.faltantes)
                console.log('faltantes',this.faltantes)
                break
              }else{
                if(itemsOrdenados.length>0){ this.servicios[idx].datos = itemsOrdenados }
              }
              
            }
      }
  }

  getTitulos(IdUniversidad:string){
    const promesa = new Promise((resolve,reject)=>{
      this.getModalidades().then(()=>{
        this.getNiveles().then(()=>{
          this.getEstados().then(()=>{
            // this.showData(IdUniversidad)
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
        this.levels = niveles.json()
        this.total_niveles = this.levels.length
        console.log('levels',this.levels)
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
        this.modality = modalidades.json()
        this.total_modalidades = this.modality.length
        console.log('modalidades',this.modality)
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
        this.status = estados.json()
        this.total_estados = this.status.length
        console.log('estados', estados.json())
        console.log('estados3', this.status)
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

//   showData(IdUniversidad){
//     this.faltantes = []  
//     var itemsOrdenados:Item[]
//     this.servicios = this.adminService.getServicios(IdUniversidad)
//     if (this.modality && this.modality.length > 0){
//       for (var idx = 0; idx < this.servicios.length; idx++) {
//         itemsOrdenados = []
//         for(let modalidad of this.modality){
//             let items:Item[]
//             items = this.servicios[idx].datos
//             for (var index = 0; index < items.length; index++) {
//               if (modalidad.description = items[index].nombre_item){
//                 itemsOrdenados.push(items[index])
//                 break
//               }
// //              this.faltantes.push(items[index])
//               //toca crear un objeto para guardar las modalidades faltantes
//               this.faltantes.push({
//                 id_tipo:1,
//                 nombre_tipo:"Modalidad",
//                 nombre_item:modalidad.description,
//                 id_item:modalidad.modalityId,
//                 id_universidad:IdUniversidad
//               })
//             } 
//           }
//           this.servicios[idx].datos = itemsOrdenados
//         }
//       }

//       if (this.levels && this.levels.length > 0){
//         itemsOrdenados = []
//         for (var idx = 0; idx < this.servicios.length; idx++) {
//           for(let nivel of this.levels){
//               let items:Item[]
//               items = this.servicios[idx].datos
//               for (var index = 0; index < items.length; index++) {
//                 if (nivel.description = items[index].nombre_item){
//                   itemsOrdenados.push(items[index])
//                   break
//                 }
//                 //this.faltantes.push(items[index])
//                 this.faltantes.push({
//                   id_tipo:2,
//                   nombre_tipo:"Nivel",
//                   item:nivel.description,
//                   id_item:nivel.levelId,
//                   id_universidad:IdUniversidad
//                 })
//               } 
//             }
//             this.servicios[idx].datos = itemsOrdenados
//           }
//         }

//       if (this.status && this.status.length > 0){
//         for (var idx = 0; idx < this.servicios.length; idx++) {
//           itemsOrdenados = []
//           for(let estado of this.status){
//               let items:Item[]
//               items = this.servicios[idx].datos
//               for (var index = 0; index < items.length; index++) {
//                 if (estado.description = items[index].nombre_item){
//                   itemsOrdenados.push(items[index])
//                   break
//                 }
//                 //this.faltantes.push(items[index])
//                 this.faltantes.push({
//                   id_tipo:2,
//                   nombre_tipo:"Estado",
//                   item:estado.description,
//                   id_item:estado.statusId,
//                   id_universidad:IdUniversidad
//                 })
//               } 
//             }
//             this.servicios[idx].datos = itemsOrdenados
//           }
//         }

//         if (this.faltantes.length>0) {
//           console.log('faltantes',this.faltantes)
//           this.saveItem()
//         }
//   }

  saveItem(faltantes:any[]){
    //this.showData()
  }

}
