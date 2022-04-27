import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-editar-fotoperfil',
  templateUrl: './editar-fotoperfil.component.html',
  styleUrls: ['./editar-fotoperfil.component.scss'],
})
export class EditarFotoperfilComponent {
  dataSource: any;
  srcResult: any;
  fileToUpload: any;
  newfotoperfil: any;

  constructor(
    public dialogRef: MatDialogRef<EditarFotoperfilComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any /* public fb: FormBuilder */,
    public datosProfile: ProfileService
  ) {}

  /*  getError() {
    return this.formControl.hasError('required') ? 'El campo es requerido' : '';
  } */

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.data.fotoperfil = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  handleFileInput(event: any) {
    this.data.fotoperfil = event.target.files[0];
  }
}
