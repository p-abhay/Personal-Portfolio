import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Login';
  constructor(public authService: AuthService, private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  email: string = '';
  password: string = '';

  passwordValue = {
    dirty: false,
    errors: {
      minlength: false,
    },
  };
  emailValue = {
    dirty: false,
    errors: {
      valid: false,
    },
  };

  onPasswordChange() {
    this.passwordValue.dirty = true;
    this.passwordValue.errors.minlength = this.password.length < 8;
  }
  onEmailChange() {
    this.emailValue.dirty = true;

    this.emailValue.errors.valid =
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(this.email);
  }
  login() {
    this.authService.login(this.email, this.password);
  }
}
