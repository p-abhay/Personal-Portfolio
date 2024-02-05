import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VerifyEmailComponent } from './verify-email.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['sendVerificationMail']);
    titleService = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      declarations: [VerifyEmailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Title, useValue: titleService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title correctly', () => {
    expect(titleService.setTitle).toHaveBeenCalledWith('Verify Email Address');
  });

  it('should display confirmation message and email', () => {
    authService.userData = { email: 'test@example.com' };
    fixture.detectChanges();

    const confirmationMessage = fixture.nativeElement.querySelector('h3');
    const userEmail = fixture.nativeElement.querySelector('strong');

    expect(confirmationMessage.textContent).toContain(
      'Thank You for Registering'
    );
    expect(userEmail.textContent).toContain('test@example.com');
  });

  it('should call authService.sendVerificationMail on Resend Verification Email button click', () => {
    const resendButton: DebugElement = fixture.debugElement.query(
      By.css('.btnPrimary')
    );

    // Simulate button click
    resendButton.triggerEventHandler('click', null);

    // Check if authService.sendVerificationMail was called
    expect(authService.sendVerificationMail).toHaveBeenCalled();
  });
});
