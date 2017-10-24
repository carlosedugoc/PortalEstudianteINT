import { Component,Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from "@angular/router";
import { AdministracionService } from "../../../shared/services/administracion.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AdministracionService]
})
export class HeaderComponent {
public idioma:string
public usuario:string = ""
public logo:string
@Output() rol: EventEmitter<string> = new EventEmitter<string>();
public universidad:string


constructor(private translate: TranslateService, 
            private router:Router, 
            private adminService:AdministracionService) {
    let lan = window.navigator.language.substr(0,2)
    translate.setDefaultLang(lan);
    this.idioma = lan

  }


getCodUniversidad(){
  let codUniversidad:number
  switch (this.usuario) {
    case 'AA':
      codUniversidad = 1
      break;
    case 'Poli':
      codUniversidad = 2
      break
    default:
      codUniversidad = 3
      break;
  }
  return codUniversidad
}
  

switchLanguage(language: string) {
  this.translate.use(language);
  this.idioma = language
  let codUniversidad:number = this.getCodUniversidad()
  var lenguaje:any = {
    nombreUsuario:this.usuario,
    codigoBanner:codUniversidad,
    codigoIdioma:language
  }
  console.log('objIdioma',lenguaje)
    this.adminService.updateIdioma(lenguaje,'http://10.75.8.109/PEServices/api/Usuario/Idioma/').subscribe(lan=>{
      console.log('language',lan)
      
    })
}


cambiar(universidad:string){
    let codUniversidad:number = this.getCodUniversidad()
    console.log(this.usuario,codUniversidad)
    this.adminService.getIdioma(this.usuario,codUniversidad,'http://10.75.8.109/PEServices/api/Usuario/{usuario}/Universidad/').subscribe(lan=>{
      console.log('language',JSON.stringify(lan))
      this.idioma = lan
      this.translate.use(lan);
    })

    document.getElementById('estilos')['href']=`../assets/css/estilos${universidad}.css`
    document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${universidad}.png`
    document.getElementById('logo')['src']=`../assets/img/logo_header${universidad}.png`
    localStorage.setItem('rol',universidad)
    this.rol.emit(universidad)
    console.log('header',universidad)
    this.universidad = universidad
}

}
