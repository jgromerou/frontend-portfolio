import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProfile } from 'src/app/interfaces/dialogProfile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProfile,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      nombres: [this.data.nombres, [Validators.required]],
      apellidos: [this.data.apellidos, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      fechanacimiento: [this.data.fechanacimiento, [Validators.required]],
      telefono: [this.data.telefono, [Validators.required]],
      domicilio: [this.data.domicilio, [Validators.required]],
      nacionalidad: [this.data.nacionalidad, [Validators.required]],
      estadocivil: [this.data.estadocivil, [Validators.required]],
      acercade: [this.data.acercade, [Validators.required]],
      fotoPerfil: [this.data.fotoPerfil],
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
