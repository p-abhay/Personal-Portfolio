import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  headerClass: string = 'header';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the scroll position
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Update the class based on the scroll position
    if (scrollPosition >= 50) {
      this.headerClass = 'header active';
    } else {
      this.headerClass = 'header';
    }
  }
  constructor(public authService: AuthService) {}
  status = false;
  addToggle() {
    this.status = !this.status;
  }
}
