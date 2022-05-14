import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProyecto } from 'src/app/interfaces/dialogProyecto';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.scss'],
})
export class NuevoProyectoComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<NuevoProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProyecto,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      proyecto: [this.data.proyecto, [Validators.required]],
      tecnologia: [this.data.tecnologia, [Validators.required]],
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
