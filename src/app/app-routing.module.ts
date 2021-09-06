import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { IndexComponent } from './components/index/index.component';
import { CmsComponent } from './components/cms/cms.component';
import { LoginComponent } from './components/login/login.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

const routes: Routes = [
  {path: 'mapa', component:MapComponent},
  {path: 'cms', component:CmsComponent},
  {path: 'galeria', component:GaleriaComponent},
  {path: 'login', component:LoginComponent},
  {path: '', component:IndexComponent},
  {path: '**', redirectTo:''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
