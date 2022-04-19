import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenLocalstorageService } from 'src/app/services/token-localstorage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  title = 'Demo1';
  //enlace = 'logueo'
  constructor(
    private router: Router,
    private tokenStorage: TokenLocalstorageService,
    public authService: AuthService
  ) {}

  irLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.authService.CerrarSesion();
  }
}
