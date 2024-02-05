import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  async,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signUp']);
    const titleServiceSpy = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Title, useValue: titleServiceSpy },
      ],
      imports: [FormsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title to "SignUp"', () => {
    const titleService = TestBed.inject(Title);
    component.ngOnInit();
    expect(titleService.setTitle).toHaveBeenCalledWith('SignUp');
  });

  it('should update password validity on password change', () => {
    component.password = 'password';
    component.onPasswordChange();

    expect(component.passwordValue.dirty).toBe(true);
    expect(component.passwordValue.errors?.minlength).toBe(false);
  });

  it('should update email validity on email change', () => {
    component.email = 'test@example.com';
    component.onEmailChange();

    expect(component.emailValue.dirty).toBe(true);
    expect(component.emailValue.errors?.valid).toBe(false);
  });

  it('should update confirm password validity on confirm password change', () => {
    component.password = 'password';
    component.confirmPassword = 'password';
    component.onConfirmPasswordChange();

    expect(component.confirmPasswordValue.dirty).toBe(true);
    expect(component.confirmPasswordValue.errors?.minlength).toBe(false);
    expect(component.confirmPasswordValue.errors?.equal).toBe(true);
  });

  it('should call signUp method on form submission when passwords match', fakeAsync(async () => {
    component.email = 'test@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));

    authService.signUp.and.returnValue(Promise.resolve());

    form.triggerEventHandler('ngSubmit', null);
    tick();
    await fixture.whenStable();

    expect(authService.signUp).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
  }));

  it('should not call signUp method on form submission when passwords do not match', fakeAsync(async () => {
    component.email = 'test@example.com';
    component.password = 'password1';
    component.confirmPassword = 'password2';

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));

    authService.signUp.and.returnValue(Promise.resolve());

    form.triggerEventHandler('ngSubmit', null);
    tick();
    await fixture.whenStable();

    expect(authService.signUp).not.toHaveBeenCalled();
  }));
});
