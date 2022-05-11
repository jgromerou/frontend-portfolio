import {
  MatDatepickerControl,
  MatDatepickerPanel,
} from '@angular/material/datepicker/datepicker-base';

export interface DialogEducacion {
  idEducacion: number;
  institucion: string;
  titulo: string;
  fechaInicio: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  fechaFin: Date;
  porcentaje_carrera: number;
  /* persona: number; */
}
