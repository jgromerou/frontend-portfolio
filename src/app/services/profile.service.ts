import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + 'persona/traer');
  }

  obtenerFotoPerfil(): Observable<any> {
    return this.http.get<any>(
      this.url + 'test/filesget/uploads/aguila__1280x720202204270928.jpg',
      {
        responseType: 'Blob' as 'json',
      }
    );
  }

  guardarFoto(fotoperfil: any) {
    const formData = new FormData();
    formData.append('file', fotoperfil);
    return this.http.post(this.url + `test/upload/`, formData);
  }
}
