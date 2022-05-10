import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHabilidad } from 'src/app/interfaces/dialogHabilidad';

@Component({
  selector: 'app-borrar-habilidad',
  templateUrl: './borrar-habilidad.component.html',
  styleUrls: ['./borrar-habilidad.component.scss'],
})
export class BorrarHabilidadComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<BorrarHabilidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogHabilidad,
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
