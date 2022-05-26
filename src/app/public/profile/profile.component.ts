import { Component, OnInit } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
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
  imagenCargada: any = false;
  username = 'jgromerou';

  constructor(private datosProfile: ProfileService) {}

  ngOnInit() {
    this.datosProfile.obtenerDatos().subscribe((data) => {
      this.profile = data[0];
      this.datosProfile
        .obtenerFotoPerfil(this.profile.fotoPerfil)
        .subscribe((data) => {
          this.createImageFromBlob(data);
        });
    });

    setTimeout(() => {
      if (!this.imagenCargada) {
        this.foto_perfil = './assets/fotoPerfil.webp';
      }
    }, 2300);
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
      this.imagenCargada = true;
    } else {
      this.imagenCargada = false;
    }
  }
}
