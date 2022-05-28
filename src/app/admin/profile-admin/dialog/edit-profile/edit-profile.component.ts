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
      nombres: [
        this.data.nombres,
        [Validators.required, Validators.maxLength(40)],
      ],
      apellidos: [
        this.data.apellidos,
        [Validators.required, Validators.maxLength(40)],
      ],
      email: [
        this.data.email,
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      fechanacimiento: [this.data.fechanacimiento, [Validators.required]],
      telefono: [
        this.data.telefono,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      domicilio: [
        this.data.domicilio,
        [Validators.required, Validators.maxLength(60)],
      ],
      nacionalidad: [
        this.data.nacionalidad,
        [Validators.required, Validators.maxLength(40)],
      ],
      estadocivil: [
        this.data.estadocivil,
        [Validators.required, Validators.maxLength(40)],
      ],
      acercade: [
        this.data.acercade,
        [Validators.required, Validators.maxLength(255)],
      ],
      fotoPerfil: [this.data.fotoPerfil, []],
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
