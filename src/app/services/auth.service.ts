import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rol: any;

  isAuthenticatedSrc: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    JSON.parse(sessionStorage.getItem('currentUser') || 'false')
  );

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSrc.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.rol;
  }

  isLoggedIn: boolean = false;
  url = `${environment.URL_SERVICIOS}/auth/login`;
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient, private ruta: Router) {
    console.log('El servicio de autenticacion está corriendo');
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );

    this.obtenerRol();
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.rol = this.currentUserSubject.getValue().roles[0];
        this.isAuthenticatedSrc.next(true);
        this.isLoggedIn = true;
        console.log('data', data);
        return data;
      })
    );
  }

  CerrarSesion(): void {
    this.isLoggedIn = false;
    this.isAuthenticatedSrc.next(false);
    this.ruta.navigate(['login']);
    console.log('Se cerró la sesión');
  }

  obtenerRol() {
    var values = JSON.parse(sessionStorage.getItem('currentUser') || 'false');
    if (values.username !== undefined) {
      console.log('sessionstorage', sessionStorage.getItem('currentUser'));
      if (this.currentUserSubject.getValue().roles[0] == 'ROLE_ADMIN') {
        this.rol = true;
      } else {
        this.rol = false;
      }
    } else {
      this.rol = false;
    }
  }

  get UsuarioAuth() {
    return this.currentUserSubject.value;
  }
}
