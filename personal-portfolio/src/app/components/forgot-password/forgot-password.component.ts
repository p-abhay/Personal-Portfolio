import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  title = 'Forgot Password';
  email = '';
  constructor(public authService: AuthService, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  emailValue = {
    dirty: false,
    errors: {
      valid: false,
    },
  };
  onEmailChange() {
    this.emailValue.dirty = true;

    this.emailValue.errors.valid =
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(this.email);
  }

  passwordReset() {
    this.authService.forgotPassword(this.email);
  }
}
