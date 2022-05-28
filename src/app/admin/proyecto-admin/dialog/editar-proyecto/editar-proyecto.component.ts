import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogProyecto } from 'src/app/interfaces/dialogProyecto';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.scss'],
})
export class EditarProyectoComponent {
  dataSource: any;
  form!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditarProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProyecto,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      proyecto: [
        this.data.proyecto,
        [Validators.required, Validators.maxLength(40)],
      ],
      tecnologia: [
        this.data.tecnologia,
        [Validators.required, Validators.maxLength(40)],
      ],
      linkrepositorio: [
        this.data.linkrepositorio,
        [Validators.required, Validators.maxLength(254)],
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
