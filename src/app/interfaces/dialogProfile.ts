import {
  MatDatepickerControl,
  MatDatepickerPanel,
} from '@angular/material/datepicker/datepicker-base';

export interface DialogProfile {
  idPersona: number;
  nombres: string;
  apellidos: string;
  email: string;
  fechanacimiento: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;
  telefono: string;
  domicilio: string;
  nacionalidad: string;
  estadocivil: string;
  acercade: string;
  fotoPerfil: string;
  /* persona: number; */
}
