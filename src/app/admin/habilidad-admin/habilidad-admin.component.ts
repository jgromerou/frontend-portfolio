import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { BorrarHabilidadComponent } from './dialog/borrar-habilidad/borrar-habilidad.component';
import { EditarHabilidadComponent } from './dialog/editar-habilidad/editar-habilidad.component';
import { NuevaHabilidadComponent } from './dialog/nueva-habilidad/nueva-habilidad.component';

@Component({
  selector: 'app-habilidad-admin',
  templateUrl: './habilidad-admin.component.html',
  styleUrls: ['./habilidad-admin.component.scss'],
})
export class HabilidadAdminComponent implements OnInit {
  miHabilidad$!: Observable<any>;
  habSubscription!: Subscription;

  constructor(
    private datosHabilidad: HabilidadService,
    public dialog: MatDialog,
    private ruta: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.miHabilidad$ = this.datosHabilidad.obtenerDatos();
    this.habSubscription = this.datosHabilidad.habilidadSubject.subscribe(
      () => {
        this.miHabilidad$ = this.datosHabilidad.obtenerDatos();
      }
    );
  }

  ngOnDestroy(): void {
    this.habSubscription.unsubscribe;
  }

  openDialogNuevo() {
    const dialogRef = this.dialog.open(NuevaHabilidadComponent, {
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
        this.datosHabilidad.nuevaHabilidad(result).subscribe((resp: any) => {
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
        this.datosHabilidad.editarHabilidad(result).subscribe((resp: any) => {
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
        this.datosHabilidad.borrarHabilidad(result).subscribe((resp: any) => {
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }
}
