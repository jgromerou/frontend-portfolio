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
  foto_perfil: any;
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

  ngAfterViewInit() {
    this.datosProfile.obtenerFotoPerfil().subscribe((data) => {
      this.createImageFromBlob(data);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.foto_perfil = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
