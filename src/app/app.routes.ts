import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from "./components/administracion/administracion.component";

const routes: Routes = [
    { path: '', component: AdministracionComponent },
    { path: 'administracion', component: AdministracionComponent },
    { path: 'administracion/:rol', component: AdministracionComponent },
    { path: '**', pathMatch:'full', redirectTo: 'administracion' }
];

export const appRouting = RouterModule.forRoot(routes);