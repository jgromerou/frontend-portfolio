import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenLocalstorageService } from 'src/app/services/token-localstorage.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';

  constructor(
    public fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenLocalstorageService,
    private ruta: Router
  ) {
    this.formLogin = fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onEnviar(event: Event) {
    event.preventDefault();
    this.authService.IniciarSesion(this.formLogin.value).subscribe(
      (data) => {
        console.log('DATA' + JSON.stringify(data));
        this.tokenStorage.saveToken(data.accessToken);
        /*  this.tokenStorage.saveUser(data); */
        this.ruta.navigate(['/homepage']);
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage, 'Mensaje de error logueo');
      }
    );
  }
}
function viewChild(ToolbarComponent: any) {
  throw new Error('Function not implemented.');
}
