import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
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
}
