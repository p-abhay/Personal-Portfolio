import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const titleServiceSpy = jasmine.createSpyObj('Title', ['setTitle']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Title, useValue: titleServiceSpy },
      ],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title to "Login"', () => {
    const titleService = TestBed.inject(Title); // Inject Title service
    component.ngOnInit();
    expect(titleService.setTitle).toHaveBeenCalledWith('Login');
  });

  it('should update password validity on password change', () => {
    component.password = 'password';
    component.onPasswordChange();

    expect(component.passwordValue.dirty).toBe(true);
    expect(component.passwordValue.errors.minlength).toBe(false);
  });

  it('should update email validity on email change', () => {
    component.email = 'test@example.com';
    component.onEmailChange();

    expect(component.emailValue.dirty).toBe(true);
    expect(component.emailValue.errors.valid).toBe(false);
  });

  it('should call login method on form submission', fakeAsync(() => {
    component.email = 'test@example.com';
    component.password = 'password';

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));

    authService.login.and.returnValue(Promise.resolve());

    form.triggerEventHandler('ngSubmit', null);
    tick();

    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
  }));
});
