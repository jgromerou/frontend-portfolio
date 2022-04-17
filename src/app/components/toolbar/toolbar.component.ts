import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  title = 'Demo1';
  //enlace = 'logueo'
  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['login']);
  }
}
