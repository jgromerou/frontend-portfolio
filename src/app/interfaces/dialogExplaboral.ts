import {
  MatDatepickerControl,
  MatDatepickerPanel,
} from '@angular/material/datepicker/datepicker-base';

export interface DialogExplaboral {
  idExperienciaLaboral: number;
  empresa: string;
  puesto: string;
  descripcionTareas: string;
  fechaInicio: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  fechaFin: Date;
  /* persona: number; */
}
