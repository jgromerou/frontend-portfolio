import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se agregó la nueva experiencia laboral',
                showConfirmButton: false,
                timer: 1500,
              });
              return;
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error de conexión',
                showConfirmButton: false,
                timer: 1500,
              });
            },
          }
        )
      );
  }

  editarExplaboral(exp: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(
        this.url + `/experiencialaboral/editar/${exp.idExperienciaLaboral}`,
        exp,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.explaboralSubject.next(exp);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se borró correctamente',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error de conexión',
                showConfirmButton: false,
                timer: 1500,
              });
            },
          }
        )
      );
  }

  borrarExplaboral(exp: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .delete(
        this.url + `/experiencialaboral/borrar/${exp.idExperienciaLaboral}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          responseType: 'text',
        }
      )
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.explaboralSubject.next(exp);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se borró correctamente',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error de conexión',
                showConfirmButton: false,
                timer: 1500,
              });
            },
          }
        )
      );
  }
}
