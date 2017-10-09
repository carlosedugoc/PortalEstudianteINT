import { Component, OnInit } from '@angular/core';
import { AdministracionService } from "../../../shared/services/administracion.service";
import { Servicio } from "../../../shared/models/servicio";
import { Nivel } from "../../../shared/models/nivel";
import { Modalidad } from "../../../shared/models/modalidad";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdministracionService]
})
export class AdministracionComponent implements OnInit {
  public servicios:Servicio[]
  public niveles:Nivel[]
  public modalidades:Modalidad[]
  public token;
  public errorMessage:string 
  public total_modalidades:number
  public total_niveles:number

  constructor(private adminService:AdministracionService) { 
    this.servicios = this.adminService.getServicios()
    this.getToken()

    this.token = localStorage.getItem('token')
    this.total_niveles = 0
    this.adminService.getNiveles(this.token).subscribe(niveles=>{
      this.niveles = niveles
      this.total_niveles = this.niveles.length
    })
    this.total_modalidades  = 0
    this.adminService.getModalidades(this.token).subscribe(modalidades=>{
      this.modalidades = modalidades
      this.total_modalidades = this.modalidades.length
    })

  }


  getToken(){
      this.adminService.getToken().subscribe(response=>{
        this.token = response
        if(this.token.length <= 0){
          alert("El token no se ha generado correctamente");
        }else{
            localStorage.setItem('token', this.token);
        }
      },error=>{
        let errorMessage = <any>error;
        if(errorMessage != null){
          this.errorMessage = error.error_description
          console.log(error);
        }
      })
  }

 

  ngOnInit() {
  }

}
