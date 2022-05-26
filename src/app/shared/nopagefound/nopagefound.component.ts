import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss'],
})
export class NopagefoundComponent {
  sesionActiva: boolean;
  constructor(private ruta: Router) {
    this.sesionActiva = localStorage.getItem('currentUser') ? true : false;
  }

  iraInicio() {
    this.ruta.navigate(['']);
  }
}
