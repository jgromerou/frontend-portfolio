import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenLocalstorageService } from 'src/app/services/token-localstorage.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = true;
  islog!: boolean;
  title = 'Demo1';
  //enlace = 'logueo'
  constructor(
    private router: Router,
    private tokenStorage: TokenLocalstorageService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    console.log('on init', this.isLoggedIn);
  }
  ngAfterViewInit() {
    console.log('on after view init', this.isLoggedIn);
    // this returns null
  }

  irLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.authService.CerrarSesion();
  }
}
