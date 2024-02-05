import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent, NavbarComponent, FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a navbar', () => {
    const navbarElement = fixture.debugElement.query(
      By.directive(NavbarComponent)
    );
    expect(navbarElement).not.toBeNull();
  });

  it('should have a footer', () => {
    const footerElement = fixture.debugElement.query(
      By.directive(FooterComponent)
    );
    expect(footerElement).not.toBeNull();
  });
});
