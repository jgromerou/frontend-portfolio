import { Component, OnInit } from '@angular/core';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss'],
})
export class HabilidadComponent implements OnInit {
  miHabilidad: any;

  constructor(private datosHabilidad: HabilidadService) {}

  ngOnInit(): void {
    this.datosHabilidad.obtenerDatos().subscribe((data) => {
      //console.log('Habilidades', JSON.stringify(data));
      this.miHabilidad = data;
    });
  }
}
