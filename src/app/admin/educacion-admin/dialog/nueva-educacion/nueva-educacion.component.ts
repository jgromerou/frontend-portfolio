import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEducacion } from 'src/app/interfaces/dialogEducacion';
@Component({
  selector: 'app-nueva-educacion',
  templateUrl: './nueva-educacion.component.html',
  styleUrls: ['./nueva-educacion.component.scss'],
})
export class NuevaEducacionComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NuevaEducacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEducacion,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      institucion: [this.data.institucion, [Validators.required]],
      titulo: [this.data.titulo, [Validators.required]],
      fechaInicio: [this.data.fechaInicio, [Validators.required]],
      porcentaje_carrera: [this.data.porcentaje_carrera, [Validators.required]],
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
