import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  educacionSubject = new Subject<any>();
  TOKEN_KEY = 'auth-token';
  token: string = '';

  url = `${environment.URL_SERVICIOS}`;
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + '/educacion/traer');
  }

  nuevaEducacion(educ: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .post(this.url + `/educacion/crear`, educ, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: 'text',
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.educacionSubject.next(educ);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }

  editarEducacion(educ: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(this.url + `/educacion/editar/${educ.idEducacion}`, educ, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.educacionSubject.next(educ);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }

  borrarEducacion(educ: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .delete(this.url + `/educacion/borrar/${educ.idEducacion}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        responseType: 'text',
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.educacionSubject.next(educ);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }
}
