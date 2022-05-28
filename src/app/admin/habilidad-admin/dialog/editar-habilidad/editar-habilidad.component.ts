import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHabilidad } from 'src/app/interfaces/dialogHabilidad';

@Component({
  selector: 'app-editar-habilidad',
  templateUrl: './editar-habilidad.component.html',
  styleUrls: ['./editar-habilidad.component.scss'],
})
export class EditarHabilidadComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditarHabilidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogHabilidad,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      habilidad: [
        this.data.habilidad,
        [Validators.required, Validators.maxLength(40)],
      ],
      porcentaje_habilidad: [
        this.data.porcentaje_habilidad,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(0),
          Validators.max(100),
        ],
      ],
    });
  }

  getError() {
    return this.form.hasError('required') ? 'El campo es requerido' : '';
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
