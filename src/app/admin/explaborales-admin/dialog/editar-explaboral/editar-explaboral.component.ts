import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExplaboral } from 'src/app/interfaces/dialogExplaboral';

@Component({
  selector: 'app-editar-explaboral',
  templateUrl: './editar-explaboral.component.html',
  styleUrls: ['./editar-explaboral.component.scss'],
})
export class EditarExplaboralComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditarExplaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogExplaboral,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      empresa: [
        this.data.empresa,
        [Validators.required, Validators.maxLength(50)],
      ],
      puesto: [
        this.data.puesto,
        [Validators.required, Validators.maxLength(50)],
      ],
      descripcionTareas: [
        this.data.descripcionTareas,
        [Validators.required, Validators.maxLength(255)],
      ],
      fechaInicio: [this.data.fechaInicio, [Validators.required]],
      fechaFin: [this.data.fechaFin, []],
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
