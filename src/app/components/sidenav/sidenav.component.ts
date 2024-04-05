import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive,
    MatDividerModule, MatIconModule, MatButtonModule, MatListModule, MatExpansionModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  @Input() sideNav!: MatSidenav;

  constructor(private deviseDetectorService: DeviceDetectorService) {

  }
  sideNavCloseOnMobile() {

    if (!this.deviseDetectorService.isDesktop()) {
      this.sideNav.close();
    }
  }
}
