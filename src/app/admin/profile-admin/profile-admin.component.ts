import { Component, OnInit } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ProfileService } from 'src/app/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarFotoperfilComponent } from './dialog/editar-fotoperfil/editar-fotoperfil.component';
import { Subscription } from 'rxjs';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss'],
})
export class ProfileAdminComponent implements OnInit {
  repos: any;
  profile: any;
  foto_perfil: any;
  username = 'jgromerou';
  fotoSubscription!: Subscription;

  constructor(public datosProfile: ProfileService, public dialog: MatDialog) {}

  ngOnInit() {
    this.datosProfile.obtenerDatos().subscribe((data) => {
      this.profile = data[0];
      this.datosProfile
        .obtenerFotoPerfil(this.profile.fotoPerfil)
        .subscribe((data) => {
          this.createImageFromBlob(data);
        });
    });

    this.fotoSubscription = this.datosProfile.datosSubject.subscribe((resp) => {
      this.datosProfile.obtenerFotoPerfil(resp).subscribe((data) => {
        this.createImageFromBlob(data);
      });
    });
  }

  ngAfterViewInit() {}

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

  openDialogEditarFotoperfil(foto_perfil: any) {
    const dialogRef = this.dialog.open(EditarFotoperfilComponent, {
      width: '600px',
      panelClass: 'makeItMiddle',

      data: {
        fotoperfil: foto_perfil,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.datosProfile
        .guardarFoto(result.fotoperfil)
        .subscribe((resp: any) => {
          console.log('sending this to server', resp.message);
          this.datosProfile
            .guardarStringFoto(resp.message)
            .subscribe((resp2: any) => {
              console.log('se agregó foto de perfil string', resp2);
              return;
            });
          return;
        });
      return;
    });
  }
}
