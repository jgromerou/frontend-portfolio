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
    /* this.expSubscription = this.datosExplaborales.explaboralSubject.subscribe(
      () => {
        this.explaborales$ = this.datosExplaborales.obtenerDatos();
        // this.expArray = this.datosExplaborales.obtenerDatos();
      }
    ); */
    //this.expArray = this.explaborales$
  }

  /* ngOnDestroy(): void {
    this.expSubscription.unsubscribe;
  } */

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.expArray, event.previousIndex, event.currentIndex);
  }
}
