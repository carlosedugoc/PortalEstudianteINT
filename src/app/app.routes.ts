import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from "./components/administracion/administracion.component";

const routes: Routes = [
    { path: 'administracion', component: AdministracionComponent },
    { path: '**', pathMatch:'full', redirectTo: 'administracion' }
];

export const appRouting = RouterModule.forRoot(routes);