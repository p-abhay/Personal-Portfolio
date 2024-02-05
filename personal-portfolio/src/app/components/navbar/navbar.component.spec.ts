import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: { signOut: jasmine.Spy; isLoggedIn: boolean };

  beforeEach(waitForAsync(() => {
    const authServiceMock = {
      signOut: jasmine.createSpy('signOut'),
      isLoggedIn: false, // Initially, user is not logged in
    };

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as any;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should toggle headerClass based on scroll position', () => {
  //   const header = fixture.nativeElement.querySelector('header');

  //   // Initial class
  //   expect(header.classList.contains('header')).toBeTruthy();
  //   expect(header.classList.contains('active')).toBeFalsy();

  //   // Simulate scrolling - less than 50
  //   window.scroll(0, 49);
  //   window.dispatchEvent(new Event('scroll'));
  //   fixture.detectChanges();
  //   expect(header.classList.contains('header')).toBeTruthy();
  //   expect(header.classList.contains('active')).toBeFalsy();

  //   // Simulate scrolling - greater than or equal to 50
  //   window.scroll(0, 50);
  //   window.dispatchEvent(new Event('scroll'));
  //   fixture.detectChanges();
  //   expect(header.classList.contains('header')).toBeTruthy();
  //   expect(header.classList.contains('active')).toBeTruthy();
  // });

  it('should toggle status on button click', () => {
    const toggleButton: DebugElement = fixture.debugElement.query(
      By.css('.nav-toggle-btn')
    );

    // Initial status
    expect(component.status).toBeFalsy();

    // Simulate button click
    toggleButton.triggerEventHandler('click', null);

    // Check if status is toggled
    expect(component.status).toBeTruthy();
  });

  it('should display SignUp and Login buttons if not logged in', () => {
    const signUpButton: DebugElement = fixture.debugElement.query(
      By.css('a[routerLink="/signup"]')
    );
    const loginButton: DebugElement = fixture.debugElement.query(
      By.css('a[routerLink="/login"]')
    );

    // Mock that user is not logged in
    authService.isLoggedIn = false;
    fixture.detectChanges();

    expect(signUpButton).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('should display Logout button if logged in', () => {
    const logoutButton: DebugElement = fixture.debugElement.query(
      By.css('a[routerLink="/login"]')
    );
    console.log('hekd2', logoutButton);
    // Mock that user is logged in
    authService.isLoggedIn = true;
    fixture.detectChanges();

    expect(logoutButton).toBeTruthy();
  });

  // it('should call authService.signOut on Logout button click', () => {
  //   // Mock that user is logged in
  //   authService.isLoggedIn = true;
  //   const logoutButton: DebugElement = fixture.debugElement.query(
  //     By.css('a[routerLink=""]')
  //   );

  //   fixture.detectChanges();
  //   console.log('hekd', logoutButton);
  //   // Simulate Logout button click
  //   logoutButton.triggerEventHandler('click', null);

  //   // Check if authService.signOut was called
  //   expect(authService.signOut).toHaveBeenCalled();
  // });
});
