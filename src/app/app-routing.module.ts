import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { LoginGuard } from './guards/login.guard';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { LoginComponent } from './shared/login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/shared/shared.module').then((m) => m.SharedModule),
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
