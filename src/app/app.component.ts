import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  ngOnChanges(){
    console.log(this.rol)
  }
  public rol: string 

  constructor(){
    localStorage.setItem('rol',this.rol)
    console.log('rol',this.rol)
  }

  changeRol(event) {
    this.rol = event;
  }
  


}
