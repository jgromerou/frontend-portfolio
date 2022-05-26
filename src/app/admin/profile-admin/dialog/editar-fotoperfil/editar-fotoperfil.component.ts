import { Component, Inject } from '@angular/core';
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
  isLoadImage: boolean = true;
  newfotoperfil: any;

  constructor(
    public dialogRef: MatDialogRef<EditarFotoperfilComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public datosProfile: ProfileService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.isLoadImage = true;
  }

  handleFileInput(event: any) {
    this.isLoadImage = false;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.newfotoperfil = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    this.data.fotoperfil = event.target.files[0];
  }
}
