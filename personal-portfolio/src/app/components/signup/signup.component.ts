import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'SignUp';
  constructor(public authService: AuthService, private titleService: Title) {}
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  confirmPasswordValue = {
    dirty: false,
    errors: {
      minlength: false,
      equal: false,
    },
  };
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

  onConfirmPasswordChange() {
    this.confirmPasswordValue.dirty = true;
    this.confirmPasswordValue.errors.minlength = this.password.length < 8;
    this.confirmPasswordValue.errors.equal =
      this.password === this.confirmPassword;
  }
  onPasswordChange() {
    this.passwordValue.dirty = true;
    this.passwordValue.errors.minlength = this.password.length < 8;
  }
  onEmailChange() {
    this.emailValue.dirty = true;

    this.emailValue.errors.valid =
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(this.email);
  }
  signUp() {
    if (this.password === this.confirmPassword)
      this.authService.signUp(this.email, this.password);
  }
}
