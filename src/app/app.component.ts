import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
    user = {
      name: 'Carlos',
      age: 37
    };
    constructor(private translate: TranslateService) {
        let lan = window.navigator.language.substr(0,2)
        translate.setDefaultLang(lan);
    }

    switchLanguage(language: string) {
      this.translate.use(language);
    }


}
