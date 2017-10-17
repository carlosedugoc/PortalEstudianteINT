import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AdministracionService } from "../shared/services/administracion.service";
import "../assets/css/estilos.css";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AdministracionService]
})
export class AppComponent {
  public rol:string 
  title = 'app';
    user = {
      name: 'Carlos',
      age: 37
    };


    constructor(private translate: TranslateService,
                private adminService: AdministracionService) {
        let lan = window.navigator.language.substr(0,2)
        translate.setDefaultLang(lan);
        
    }
public flag:number = 0
    cambiar(){
      document.getElementById('est')['href']=`../assets/css/estilos${this.rol}.css`
      // if (this.flag == 0){
      //   document.getElementById('est')['href']=`../assets/css/estilos${this.rol}.css`
      // }else if (this.flag == 1){
      //   document.getElementById('est')['href']='../assets/css/estilosAA.css'
      // }else if (this.flag == 2){
      //   document.getElementById('est')['href']='../assets/css/estilosPoli.css'
      //   this.flag = -1
      // }
      //   this.flag++
      //   console.log(this.flag)
    }

    switchLanguage(language: string) {
      this.translate.use(language);
    }


    


}
