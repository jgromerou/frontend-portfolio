import {
  MatDatepickerControl,
  MatDatepickerPanel,
} from '@angular/material/datepicker/datepicker-base';

export interface DialogEducacion {
  idEducacion: number;
  institucion: string;
  titulo: string;
  fechaInicio: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  fechaFin: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  porcentaje_carrera: number;
  linkimagen: string;
  /* persona: number; */
}
