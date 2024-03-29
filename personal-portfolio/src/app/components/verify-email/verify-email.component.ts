import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  title = 'Verify Email Address';
  constructor(public authService: AuthService, private titleService: Title) {}
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}
