import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialoglogin';

@Component({
  selector: 'app-logindialog',
  templateUrl: './logindialog.component.html',
  styleUrls: ['./logindialog.component.scss'],
})
export class LogindialogComponent {
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<LogindialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder //private alumnosService: AlumnosService
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    //Validators.email,
    //Validators.pattern(/^\d+$/),
  ]);

  getError() {
    return this.formControl.hasError('required')
      ? 'El campo es requerido'
      : this.formControl.hasError('email')
      ? 'No es un email válido'
      : '';
  }

  //cargar alumnos
  /* loadAlumnos() {
    this.alumnosService.obtenerDatos().subscribe((alumnos) => {
      this.dataSource.data = alumnos;
    });
  } */

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* modificarAlumnoDialog(alumno: any) {
    this.alumnosService.modificarAlumno(alumno);
    //this.loadAlumnos();
  }
 */
}
