import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenLocalstorageService } from 'src/app/services/token-localstorage.service';

import { MatSidenav } from '@angular/material/sidenav';
import { filter, delay } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BreakpointObserver } from '@angular/cdk/layout';

@UntilDestroy()
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  title = 'ArgentinaPrograma-RomeroUro';
  mobile: boolean = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(
    private router: Router,
    private tokenStorage: TokenLocalstorageService,
    public authService: AuthService,
    private observer: BreakpointObserver
  ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 960px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          this.mobile = true;
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
          this.mobile = false;
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  irLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
    this.authService.CerrarSesion();
  }
}
