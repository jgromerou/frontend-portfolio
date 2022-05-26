import { Component, OnInit } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ProfileService } from 'src/app/services/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarFotoperfilComponent } from './dialog/editar-fotoperfil/editar-fotoperfil.component';
import { Subscription } from 'rxjs';
import { EditProfileComponent } from './dialog/edit-profile/edit-profile.component';
import { Router } from '@angular/router';
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
  profileSubscription!: Subscription;

  constructor(
    public datosProfile: ProfileService,
    public dialog: MatDialog,
    private ruta: Router
  ) {}

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

    this.profileSubscription = this.datosProfile.profileSubject.subscribe(
      () => {
        this.datosProfile.obtenerDatos().subscribe((data) => {
          this.profile = data[0];
          this.datosProfile
            .obtenerFotoPerfil(this.profile.fotoPerfil)
            .subscribe((data) => {
              this.createImageFromBlob(data);
            });
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.fotoSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
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
          this.datosProfile
            .guardarStringFoto(resp.message)
            .subscribe((resp2: any) => {
              return;
            });
          return;
        });
      return;
    });
  }

  openDialogEditarProfile(profile: any) {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '350px',
      panelClass: 'makeItMiddle',
      data: {
        idPersona: profile.idPersona,
        nombres: profile.nombres,
        apellidos: profile.apellidos,
        email: profile.email,
        fechanacimiento: profile.fechanacimiento,
        telefono: profile.telefono,
        domicilio: profile.domicilio,
        nacionalidad: profile.nacionalidad,
        estadocivil: profile.estadocivil,
        acercade: profile.acercade,
        fotoPerfil: profile.fotoPerfil,
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      this.datosProfile.editarProfile(result).subscribe((resp: any) => {
        this.ruta.navigate(['admin']);
        return;
      });
    });
  }
}
