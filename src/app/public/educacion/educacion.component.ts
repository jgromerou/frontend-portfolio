import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss'],
})
export class EducacionComponent implements OnInit {
  educacion$!: Observable<any>;
  educSubscription!: Subscription;

  constructor(
    private datosEducacion: EducacionService,
    public dialog: MatDialog,
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
}
