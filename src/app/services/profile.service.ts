import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  TOKEN_KEY = 'auth-token';
  token: string = '';
  url: string = `${environment.URL_SERVICIOS}`;
  linkfoto!: any;
  nombreArchivo!: any;

  datosSubject = new Subject<any>();
  profileSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + '/persona/traer');
  }

  obtenerFotoPerfil(linkfoto: any): Observable<any> {
    return this.http.get<any>(this.url + `/test/filesget/${linkfoto}`, {
      headers: {
        'Content-Type': 'application/json; multipart/form-data;',
      },
      responseType: 'Blob' as 'json',
    });
  }

  guardarFoto(fotoperfil: any) {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    const formData = new FormData();
    formData.append('file', fotoperfil);
    return this.http.post(this.url + `/test/upload/`, formData).pipe(
      tap(
        // Log the result or error
        {
          next: (data) => {
            this.nombreArchivo = data;
            setTimeout(() => {
              this.guardarStringFoto(this.nombreArchivo.message);
            }, 300);
          },
          error: (error) => {
            console.log(error);
          },
        }
      )
    );
  }

  guardarStringFoto(foto: String) {
    return this.http
      .put(this.url + `/persona/editarfotoperfil/1/${foto}`, {
        responseType: 'text',
      })
      .pipe(
        tap(
          //Log the result or error
          {
            next: () => {
              this.datosSubject.next(foto);
            },
            error: () => {
              this.datosSubject.next(foto);
            },
          }
        )
      );
  }

  editarProfile(profile: any): Observable<any> {
    this.token = window.sessionStorage.getItem(this.TOKEN_KEY)!;
    return this.http
      .put(this.url + `/persona/editar/${profile.idPersona}`, profile, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(
          // Log the result or error
          {
            next: () => {
              this.profileSubject.next(profile);
              console.log('editado el profile', profile);
            },
            error: (error) => {
              console.log(error);
            },
          }
        )
      );
  }
}
