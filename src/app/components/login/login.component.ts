import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formLogin = fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      /* email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]), */
    });
  }

  onSubmit() {
    console.log(this.formLogin);
  }
}
