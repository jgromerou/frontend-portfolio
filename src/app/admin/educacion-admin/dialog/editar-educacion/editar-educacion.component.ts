import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEducacion } from 'src/app/interfaces/dialogEducacion';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.scss'],
})
export class EditarEducacionComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditarEducacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEducacion,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      institucion: [
        this.data.institucion,
        [Validators.required, Validators.maxLength(40)],
      ],
      titulo: [
        this.data.titulo,
        [Validators.required, Validators.maxLength(40)],
      ],
      fechaInicio: [this.data.fechaInicio, [Validators.required]],
      fechaFin: [this.data.fechaFin, [Validators.required]],
      porcentaje_carrera: [
        this.data.porcentaje_carrera,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      linkimagen: [
        this.data.linkimagen,
        [Validators.required, Validators.maxLength(254)],
      ],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getError() {
    return this.form.hasError('required') ? 'El campo es requerido' : '';
  }

  sendit(data: any) {
    if (this.form.valid) {
      this.dialogRef.close(data);
    } else {
      console.log('Los campos son requeridos');
    }
  }
}
