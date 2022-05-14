import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';
import { BorrarEducacionComponent } from './dialog/borrar-educacion/borrar-educacion.component';
import { EditarEducacionComponent } from './dialog/editar-educacion/editar-educacion.component';
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
        institucion: '',
        titulo: '',
        fechaInicio: '',
        fechaFin: '',
        porcentaje_carrera: '',
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      if (result != undefined) {
        this.datosEducacion.nuevaEducacion(result).subscribe((resp: any) => {
          this.ruta.navigate(['admin']);
          return;
        });
      }
    });
  }

  openDialogEditar(educ: any) {
    const dialogRef = this.dialog.open(EditarEducacionComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idEducacion: educ.idEducacion,
        institucion: educ.institucion,
        titulo: educ.titulo,
        fechaInicio: educ.fechaInicio,
        fechaFin: educ.fechaFin,
        porcentaje_carrera: educ.porcentaje_carrera,
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      this.datosEducacion.editarEducacion(result).subscribe((resp: any) => {
        this.ruta.navigate(['admin']);
        return;
      });
    });
  }

  openDialogBorrar(educ: any) {
    const dialogRef = this.dialog.open(BorrarEducacionComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idEducacion: educ.idEducacion,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['admin']);

      this.datosEducacion.borrarEducacion(result).subscribe((resp: any) => {
        return;
      });
    });
  }
}
