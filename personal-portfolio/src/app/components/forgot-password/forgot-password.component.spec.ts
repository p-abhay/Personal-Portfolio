import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['forgotPassword']);

    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authService }, Title],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title correctly', () => {
    const titleService = TestBed.inject(Title);
    expect(titleService.getTitle()).toBe('Forgot Password');
  });

  it('should update emailValue on email input change', async () => {
    const emailInput: DebugElement = fixture.debugElement.query(
      By.css('input[type="email"]')
    );

    // Trigger input change
    component.email = 'test@example.com';
    component.onEmailChange(); // Explicitly call the method
    emailInput.triggerEventHandler('input', {
      target: emailInput.nativeElement,
    });

    // Manually trigger change detection
    fixture.detectChanges();

    // Wait for asynchronous operations to complete
    await fixture.whenStable();

    // Check if emailValue was updated
    expect(component.emailValue.dirty).toBe(true);
    expect(component.emailValue.errors.valid).toBe(false);
  });

  it('should call authService.forgotPassword on form submission', () => {
    const emailInput: DebugElement = fixture.debugElement.query(
      By.css('input[type="email"]')
    );

    // Set a valid email
    component.email = 'test@example.com';
    component.onEmailChange(); // Explicitly call the method
    emailInput.triggerEventHandler('input', {
      target: emailInput.nativeElement,
    });

    // Manually trigger change detection
    fixture.detectChanges();

    // Simulate form submission
    component.passwordReset(); // Explicitly call the method

    // Check if authService.forgotPassword was called with the correct email
    expect(authService.forgotPassword).toHaveBeenCalledWith('test@example.com');
  });
});
