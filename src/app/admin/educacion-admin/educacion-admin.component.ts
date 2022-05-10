import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';
import { BorrarHabilidadComponent } from '../habilidad-admin/dialog/borrar-habilidad/borrar-habilidad.component';
import { EditarHabilidadComponent } from '../habilidad-admin/dialog/editar-habilidad/editar-habilidad.component';
import { NuevaHabilidadComponent } from '../habilidad-admin/dialog/nueva-habilidad/nueva-habilidad.component';
import { NuevaEducacionComponent } from './dialog/nueva-educacion/nueva-educacion.component';

@Component({
  selector: 'app-educacion-admin',
  templateUrl: './educacion-admin.component.html',
  styleUrls: ['./educacion-admin.component.scss'],
})
export class EducacionAdminComponent implements OnInit {
  educacion$!: Observable<any>;
  educSubscription!: Subscription;

  constructor(
    private datosEducacion: EducacionService,
    public dialog: MatDialog,
    private ruta: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.educacion$ = this.datosEducacion.obtenerDatos();
    this.educSubscription = this.datosEducacion.educacionSubject.subscribe(
      () => {
        this.educacion$ = this.datosEducacion.obtenerDatos();
      }
    );
  }

  ngOnDestroy(): void {
    this.educSubscription.unsubscribe;
  }

  openDialogNuevo() {
    const dialogRef = this.dialog.open(NuevaEducacionComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        habilidad: '',
        porcentaje_habilidad: '',
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        this.datosEducacion.nuevaEducacion(result).subscribe((resp: any) => {
          this.ruta.navigate(['admin']);
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }

  openDialogEditar(hab: any) {
    const dialogRef = this.dialog.open(EditarHabilidadComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idHabilidad: hab.idHabilidad,
        habilidad: hab.habilidad,
        porcentaje_habilidad: hab.porcentaje_habilidad,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      if (result !== undefined) {
        this.datosEducacion.editarEducacion(result).subscribe((resp: any) => {
          this.ruta.navigate(['admin']);
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }

  openDialogBorrar(hab: any) {
    const dialogRef = this.dialog.open(BorrarHabilidadComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idHabilidad: hab.idHabilidad,
        habilidad: hab.habilidad,
        porcentaje_habilidad: hab.porcentaje_habilidad,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['admin']);
      if (result !== undefined) {
        this.datosEducacion.borrarEducacion(result).subscribe((resp: any) => {
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }
}
