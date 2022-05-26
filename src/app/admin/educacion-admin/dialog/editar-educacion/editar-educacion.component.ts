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
      institucion: [this.data.institucion, [Validators.required]],
      titulo: [this.data.titulo, [Validators.required]],
      fechaInicio: [this.data.fechaInicio, [Validators.required]],
      fechaFin: [this.data.fechaFin, [Validators.required]],
      porcentaje_carrera: [this.data.porcentaje_carrera, [Validators.required]],
      linkimagen: [this.data.linkimagen, [Validators.required]],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendit(data: any) {
    if (this.form.valid) {
      this.dialogRef.close(data);
    } else {
      console.log('Los campos son requeridos');
    }
  }
}
