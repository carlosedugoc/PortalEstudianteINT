import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private translate: TranslateService) {
  let lan = window.navigator.language.substr(0,2)
  translate.setDefaultLang(lan);
  }

switchLanguage(language: string) {
  this.translate.use(language);
}

}
