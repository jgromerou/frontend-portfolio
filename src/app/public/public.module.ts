import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HabilidadComponent } from './habilidad/habilidad.component';
import { ProfileComponent } from './profile/profile.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { EducacionComponent } from './educacion/educacion.component';
import { ExplaboralesComponent } from './explaborales/explaborales.component';
import { AppMaterialModule } from '../modules/app.material.module';

@NgModule({
  declarations: [
    HabilidadComponent,
    ProfileComponent,
    ProyectosComponent,
    EducacionComponent,
    ExplaboralesComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, AppMaterialModule],
  exports: [
    ProfileComponent,
    HabilidadComponent,
    ProyectosComponent,
    ExplaboralesComponent,
    EducacionComponent,
  ],
})
export class PublicModule {}
