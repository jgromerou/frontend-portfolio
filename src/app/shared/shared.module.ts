import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TerminalComponent } from './terminal/terminal.component';
import { AppMaterialModule } from '../modules/app.material.module';
import { PublicModule } from '../public/public.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    ToolbarComponent,
    FooterComponent,
    HomepageComponent,
    TerminalComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    PublicModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    ToolbarComponent,
    FooterComponent,
    HomepageComponent,
    TerminalComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, ToolbarComponent],
})
export class SharedModule {}
