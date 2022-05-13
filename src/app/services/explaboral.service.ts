import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExplaboralService {
  explaboralSubject = new Subject<any>();
  TOKEN_KEY = 'auth-token';
  token: string = '';

  url = `${environment.URL_SERVICIOS}`;
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + '/experiencialaboral/traer');
  }

  nuevaExplaboral(exp: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .post(this.url + `/experiencialaboral/crear`, exp, {
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
              this.explaboralSubject.next(exp);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }

  editarExplaboral(exp: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(this.url + `/experiencialaboral/editar/${exp.idEducacion}`, exp, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.explaboralSubject.next(exp);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }

  borrarExplaboral(exp: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .delete(this.url + `/experiencialaboral/borrar/${exp.idExplaboral}`, {
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
              this.explaboralSubject.next(exp);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }
}
