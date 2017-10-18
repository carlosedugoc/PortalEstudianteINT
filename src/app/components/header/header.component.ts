import { Component,Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private translate: TranslateService, private router:Router) {
  let lan = window.navigator.language.substr(0,2)
  translate.setDefaultLang(lan);
  }

switchLanguage(language: string) {
  this.translate.use(language);
}
public logo:string
@Output() rol: EventEmitter<string> = new EventEmitter<string>();
public universidad:string

cambiar(universidad:string){
  document.getElementById('estilos')['href']=`../assets/css/estilos${universidad}.css`
  document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${universidad}.png`
  document.getElementById('logo')['src']=`../assets/img/logo_header${universidad}.png`
  localStorage.setItem('rol',universidad)
  // this.router.navigate(['/administracion',universidad])
  this.rol.emit(universidad)
  console.log('header',universidad)
  this.universidad = universidad


}

}
