import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HabilidadService {
  habilidadSubject = new Subject<any>();
  TOKEN_KEY = 'auth-token';
  token: string = '';

  url = `${environment.URL_SERVICIOS}`;
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + '/habilidad/traer');
  }

  nuevaHabilidad(hab: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .post(this.url + `/habilidad/crear`, hab, {
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
              this.habilidadSubject.next(hab);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se agregó la nueva Habilidad',
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

  editarHabilidad(hab: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(this.url + `/habilidad/editar/${hab.idHabilidad}`, hab, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.habilidadSubject.next(hab);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se editó correctamente',
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

  borrarHabilidad(hab: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .delete(this.url + `/habilidad/borrar/${hab.idHabilidad}`, {
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
              this.habilidadSubject.next(hab);
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
