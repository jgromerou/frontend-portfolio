import { Component, OnInit } from '@angular/core';
import { HabilidadService } from 'src/app/services/habilidad.service';

// import { Skill } from 'src/app/class/skill';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.scss'],
})
export class HabilidadComponent implements OnInit {
  miHabilidad: any;

  constructor(
    private datosHabilidad: HabilidadService,
    public sSkill: HabilidadService
  ) {}

  ngOnInit(): void {
    this.datosHabilidad.obtenerDatos().subscribe((data) => {
      this.miHabilidad = data;
      console.log('Habilidaddes', this.miHabilidad);
    });
  }
}
