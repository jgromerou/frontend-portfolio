import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
/* import { LogindialogComponent } from '../logindialog/logindialog.component'; */
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  repos: any;
  profile: any;
  username = 'jgromerou';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private datosProfile: ProfileService
  ) {}

  ngOnInit() {
    this.datosProfile.obtenerDatos().subscribe((data) => {
      this.profile = data[0];
      console.log('Mis datos', this.profile);
    });
  }

  /* private getProfileInfo() {
    return this.http.get('https://api.github.com/users/' + this.username);
  } */
  /* private getProfileInfo() {
    return this.http.get('http://localhost:8080/api/persona/traer');
  } */
}
