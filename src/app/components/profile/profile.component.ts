import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  repos: any;
  profile: any;
  username = 'jgromerou';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfileInfo().subscribe((profile) => {
      console.log('Mi perfil:', profile);
      this.profile = profile;
    });
  }

  private getProfileInfo() {
    return this.http.get('https://api.github.com/users/' + this.username);
  }
}
