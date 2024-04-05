import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink,
    HeaderComponent, FooterComponent, SidenavComponent,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'memory';
  isMobile: boolean = false;
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  constructor(private deviseDetectorService: DeviceDetectorService) {

  }

  ngOnInit(): void {
    if (this.deviseDetectorService.isMobile() || this.deviseDetectorService.isTablet()) {
      this.isMobile = true;
    }
  }
}
