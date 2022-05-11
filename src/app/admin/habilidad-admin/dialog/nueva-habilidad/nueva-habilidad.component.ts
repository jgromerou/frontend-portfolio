import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHabilidad } from 'src/app/interfaces/dialogHabilidad';

@Component({
  selector: 'app-nueva-habilidad',
  templateUrl: './nueva-habilidad.component.html',
  styleUrls: ['./nueva-habilidad.component.scss'],
})
export class NuevaHabilidadComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NuevaHabilidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogHabilidad,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      habilidad: [this.data.habilidad, [Validators.required]],
      porcentaje_habilidad: [
        this.data.porcentaje_habilidad,
        [Validators.required],
      ],
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
