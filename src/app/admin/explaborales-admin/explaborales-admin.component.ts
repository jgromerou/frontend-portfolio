import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ExplaboralService } from 'src/app/services/explaboral.service';
import { BorrarExplaboralComponent } from './dialog/borrar-explaboral/borrar-explaboral.component';
import { EditarExplaboralComponent } from './dialog/editar-explaboral/editar-explaboral.component';
import { NuevaExplaboralComponent } from './dialog/nueva-explaboral/nueva-explaboral.component';

@Component({
  selector: 'app-explaborales-admin',
  templateUrl: './explaborales-admin.component.html',
  styleUrls: ['./explaborales-admin.component.scss'],
})
export class ExplaboralesAdminComponent {
  explaborales$!: Observable<any>;
  educSubscription!: Subscription;

  constructor(
    private datosExplaborales: ExplaboralService,
    public dialog: MatDialog,
    private ruta: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.explaborales$ = this.datosExplaborales.obtenerDatos();
    this.educSubscription = this.datosExplaborales.explaboralSubject.subscribe(
      () => {
        this.explaborales$ = this.datosExplaborales.obtenerDatos();
      }
    );
  }

  ngOnDestroy(): void {
    this.educSubscription.unsubscribe;
  }

  openDialogNuevo() {
    const dialogRef = this.dialog.open(NuevaExplaboralComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        empresa: '',
        puesto: '',
        descripcionTareas: '',
        fechaInicio: '',
        fechaFin: '',
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      if (result != undefined) {
        this.datosExplaborales
          .nuevaExplaboral(result)
          .subscribe((resp: any) => {
            this.ruta.navigate(['admin']);
            return;
          });
      }
    });
  }

  openDialogEditar(exp: any) {
    const dialogRef = this.dialog.open(EditarExplaboralComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idExperienciaLaboral: exp.idExperienciaLaboral,
        empresa: exp.empresa,
        puesto: exp.puesto,
        descripcionTareas: exp.descripcionTareas,
        fechaInicio: exp.fechaInicio,
        fechaFin: exp.fechaFin,
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.datosExplaborales.editarExplaboral(result).subscribe((resp: any) => {
        this.ruta.navigate(['admin']);
        return;
      });
    });
  }

  openDialogBorrar(educ: any) {
    const dialogRef = this.dialog.open(BorrarExplaboralComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idExperienciaLaboral: educ.idExperienciaLaboral,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.ruta.navigate(['admin']);

      this.datosExplaborales.borrarExplaboral(result).subscribe((resp: any) => {
        return;
      });
    });
  }
}
