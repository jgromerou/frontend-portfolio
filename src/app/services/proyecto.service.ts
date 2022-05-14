import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  proyectoSubject = new Subject<any>();
  TOKEN_KEY = 'auth-token';
  token: string = '';

  url = `${environment.URL_SERVICIOS}`;
  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + '/proyecto/traer');
  }

  nuevoProyecto(proy: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .post(this.url + `/proyecto/crear`, proy, {
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
              this.proyectoSubject.next(proy);
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Se agregó el nuevo Proyecto',
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

  editarProyecto(proy: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(this.url + `/proyecto/editar/${proy.idProyecto}`, proy, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.proyectoSubject.next(proy);
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

  borrarProyecto(proy: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .delete(this.url + `/proyecto/borrar/${proy.idProyecto}`, {
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
              this.proyectoSubject.next(proy);
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
