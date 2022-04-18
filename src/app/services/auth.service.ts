import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn!: boolean;
  url = 'https://backendargentinaprograma.herokuapp.com/api/auth/login';
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
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
    console.log('llegué');
  }

  get UsuarioAuth() {
    return this.currentUserSubject.value;
  }
}
