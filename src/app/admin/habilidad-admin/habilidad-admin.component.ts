import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HabilidadService } from 'src/app/services/habilidad.service';
import { EditarHabilidadComponent } from './dialog/editar-habilidad/editar-habilidad.component';

@Component({
  selector: 'app-habilidad-admin',
  templateUrl: './habilidad-admin.component.html',
  styleUrls: ['./habilidad-admin.component.scss'],
})
export class HabilidadAdminComponent implements OnInit {
  miHabilidad: any;

  constructor(
    private datosHabilidad: HabilidadService,
    public dialog: MatDialog,
    private ruta: Router
  ) {}

  ngOnInit(): void {
    this.datosHabilidad.obtenerDatos().subscribe((data) => {
      this.miHabilidad = data;
      console.log('Habilidaddes', this.miHabilidad);
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
      console.log('result editar', result);
      if (result !== undefined) {
        this.datosHabilidad.editarHabilidad(result).subscribe((resp: any) => {
          this.ruta.navigate(['']);
          /* setTimeout(() => {
            this.myTable.renderRows();
          }, 300); */
          return;
        });
      } else {
        this.ruta.navigate(['login']);
      }
    });
  }
}
