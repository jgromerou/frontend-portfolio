import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projectsgithub',
  templateUrl: './projectsgithub.component.html',
  styleUrls: ['./projectsgithub.component.scss'],
})
export class ProjectsgithubComponent implements OnInit {
  repos: any;
  profile: any;
  username = 'jgromerou';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfileInfo().subscribe((profile) => {
      console.log('Mi perfil:', profile);
      this.profile = profile;
    });
    this.getProfileRepos().subscribe((repos) => {
      console.log('Mi repositorio:', repos);
      this.repos = repos;
    });
  }

  private getProfileInfo() {
    return this.http.get('https://api.github.com/users/' + this.username);
  }

  private getProfileRepos() {
    return this.http.get(
      'https://api.github.com/users/' + this.username + '/repos'
    );
  }
}
