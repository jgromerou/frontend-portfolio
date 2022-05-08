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

  constructor(
    public dialogRef: MatDialogRef<EditarHabilidadComponent>,
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
