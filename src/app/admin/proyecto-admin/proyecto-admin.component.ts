import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { BorrarHabilidadComponent } from '../habilidad-admin/dialog/borrar-habilidad/borrar-habilidad.component';
import { EditarHabilidadComponent } from '../habilidad-admin/dialog/editar-habilidad/editar-habilidad.component';

@Component({
  selector: 'app-proyecto-admin',
  templateUrl: './proyecto-admin.component.html',
  styleUrls: ['./proyecto-admin.component.scss'],
})
export class ProyectoAdminComponent implements OnInit {
  proyectos$!: Observable<any>;
  proySubscription!: Subscription;

  constructor(
    private datosProyectos: ProyectoService,
    public dialog: MatDialog,
    private ruta: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.proyectos$ = this.datosProyectos.obtenerDatos();
    this.proySubscription = this.datosProyectos.proyectoSubject.subscribe(
      () => {
        this.proyectos$ = this.datosProyectos.obtenerDatos();
      }
    );
  }

  ngOnDestroy(): void {
    this.proySubscription.unsubscribe;
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
        this.datosProyectos.editarProyecto(result).subscribe((resp: any) => {
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
        this.datosProyectos.borrarProyecto(result).subscribe((resp: any) => {
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }
}
