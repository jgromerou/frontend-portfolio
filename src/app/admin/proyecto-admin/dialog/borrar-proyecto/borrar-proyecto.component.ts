import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProyecto } from 'src/app/interfaces/dialogProyecto';

@Component({
  selector: 'app-borrar-proyecto',
  templateUrl: './borrar-proyecto.component.html',
  styleUrls: ['./borrar-proyecto.component.scss'],
})
export class BorrarProyectoComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<BorrarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProyecto,
    public fb: FormBuilder
  ) {}

  formControl = new FormControl('', [Validators.required]);

  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
