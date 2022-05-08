import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  url = `${environment.URL_SERVICIOS}/auth/login`;
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient, private ruta: Router) {
    console.log('El servicio de autenticacion está corriendo');
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.isLoggedIn = true;
        return data;
      })
    );
  }

  CerrarSesion(): void {
    this.isLoggedIn = false;
    this.ruta.navigate(['login']);
    console.log('Se cerró la sesión');
  }

  get UsuarioAuth() {
    return this.currentUserSubject.value;
  }
}
