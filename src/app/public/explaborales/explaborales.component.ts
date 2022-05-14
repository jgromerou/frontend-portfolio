import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ExplaboralService } from 'src/app/services/explaboral.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-explaborales',
  templateUrl: './explaborales.component.html',
  styleUrls: ['./explaborales.component.scss'],
})
export class ExplaboralesComponent {
  explaborales$!: Observable<any>;
  expSubscription!: Subscription;
  expArray!: any[];

  constructor(
    private datosExplaborales: ExplaboralService,
    public dialog: MatDialog,
    private ruta: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.explaborales$ = this.datosExplaborales.obtenerDatos();
    this.datosExplaborales
      .obtenerDatos()
      .subscribe((a: any) => (this.expArray = a));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.expArray, event.previousIndex, event.currentIndex);
  }
}
