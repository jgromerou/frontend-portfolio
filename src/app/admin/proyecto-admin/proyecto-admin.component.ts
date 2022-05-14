import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';
import { BorrarProyectoComponent } from './dialog/borrar-proyecto/borrar-proyecto.component';
import { EditarProyectoComponent } from './dialog/editar-proyecto/editar-proyecto.component';
import { NuevoProyectoComponent } from './dialog/nuevo-proyecto/nuevo-proyecto.component';

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

  openDialogNuevo() {
    const dialogRef = this.dialog.open(NuevoProyectoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        proyecto: '',
        tecnologia: '',
        linkrepositorio: '',
        persona: 1,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      if (result != undefined) {
        this.datosProyectos.nuevoProyecto(result).subscribe((resp: any) => {
          this.ruta.navigate(['admin']);
        });
      }
    });
  }

  openDialogEditar(proy: any) {
    const dialogRef = this.dialog.open(EditarProyectoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idProyecto: proy.idProyecto,
        proyecto: proy.proyecto,
        tecnologia: proy.tecnologia,
        linkrepositorio: proy.linkrepositorio,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');
      this.datosProyectos.editarProyecto(result).subscribe((resp: any) => {
        this.ruta.navigate(['admin']);
      });
    });
  }

  openDialogBorrar(proy: any) {
    const dialogRef = this.dialog.open(BorrarProyectoComponent, {
      width: '300px',
      panelClass: 'makeItMiddle',
      data: {
        idProyecto: proy.idProyecto,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('El Dialog se ha cerrado');

      this.datosProyectos.borrarProyecto(result).subscribe((resp: any) => {
        this.ruta.navigate(['admin']);

        return;
      });
    });
  }
}
