import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { EducacionAdminComponent } from './educacion-admin/educacion-admin.component';
import { ExplaboralesAdminComponent } from './explaborales-admin/explaborales-admin.component';
import { HabilidadAdminComponent } from './habilidad-admin/habilidad-admin.component';
import { ProyectoAdminComponent } from './proyecto-admin/proyecto-admin.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../modules/app.material.module';
import { EditarFotoperfilComponent } from './profile-admin/dialog/editar-fotoperfil/editar-fotoperfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarHabilidadComponent } from './habilidad-admin/dialog/editar-habilidad/editar-habilidad.component';
import { NuevaHabilidadComponent } from './habilidad-admin/dialog/nueva-habilidad/nueva-habilidad.component';
import { BorrarHabilidadComponent } from './habilidad-admin/dialog/borrar-habilidad/borrar-habilidad.component';
import { CoreModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    EducacionAdminComponent,
    ExplaboralesAdminComponent,
    HabilidadAdminComponent,
    ProyectoAdminComponent,
    ProfileAdminComponent,
    EditarFotoperfilComponent,
    EditarHabilidadComponent,
    NuevaHabilidadComponent,
    BorrarHabilidadComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [
    DashboardAdminComponent,
    EducacionAdminComponent,
    ExplaboralesAdminComponent,
    HabilidadAdminComponent,
    ProyectoAdminComponent,
    ProfileAdminComponent,
    EditarHabilidadComponent,
    NuevaHabilidadComponent,
    BorrarHabilidadComponent,
  ],
})
export class AdminModule {}
