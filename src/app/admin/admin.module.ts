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
import { NuevaEducacionComponent } from './educacion-admin/dialog/nueva-educacion/nueva-educacion.component';
import { EditarEducacionComponent } from './educacion-admin/dialog/editar-educacion/editar-educacion.component';
import { BorrarEducacionComponent } from './educacion-admin/dialog/borrar-educacion/borrar-educacion.component';
import { NuevaExplaboralComponent } from './explaborales-admin/dialog/nueva-explaboral/nueva-explaboral.component';
import { EditarExplaboralComponent } from './explaborales-admin/dialog/editar-explaboral/editar-explaboral.component';
import { BorrarExplaboralComponent } from './explaborales-admin/dialog/borrar-explaboral/borrar-explaboral.component';
import { EditarProyectoComponent } from './proyecto-admin/dialog/editar-proyecto/editar-proyecto.component';
import { BorrarProyectoComponent } from './proyecto-admin/dialog/borrar-proyecto/borrar-proyecto.component';
import { NuevoProyectoComponent } from './proyecto-admin/dialog/nuevo-proyecto/nuevo-proyecto.component';
import { EditProfileComponent } from './profile-admin/dialog/edit-profile/edit-profile.component';

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
    NuevaEducacionComponent,
    EditarEducacionComponent,
    BorrarEducacionComponent,
    NuevaExplaboralComponent,
    EditarExplaboralComponent,
    BorrarExplaboralComponent,
    EditarProyectoComponent,
    BorrarProyectoComponent,
    NuevoProyectoComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
    NuevoProyectoComponent,
    EditarProyectoComponent,
    BorrarProyectoComponent,
    EditProfileComponent,
  ],
})
export class AdminModule {}
