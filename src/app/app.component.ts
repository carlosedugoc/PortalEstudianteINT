import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AdministracionService } from "../shared/services/administracion.service";

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

    switchLanguage(language: string) {
      this.translate.use(language);
    }


    


}
