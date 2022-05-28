import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExplaboral } from 'src/app/interfaces/dialogExplaboral';

@Component({
  selector: 'app-nueva-explaboral',
  templateUrl: './nueva-explaboral.component.html',
  styleUrls: ['./nueva-explaboral.component.scss'],
})
export class NuevaExplaboralComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NuevaExplaboralComponent>,
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
