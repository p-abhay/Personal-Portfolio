import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title as Personal Portfolio', () => {
    expect(component.title).toEqual('Personal Portfolio');
  });

  it('should display the correct name in the hero subtitle', () => {
    const compiled = fixture.nativeElement;
    const subtitle = compiled.querySelector('.hero-subtitle').textContent;
    expect(subtitle).toContain('My name is Abhay');
  });

  it('should display the correct headline in the hero content', () => {
    const compiled = fixture.nativeElement;
    const headline = compiled.querySelector('.headline-lg').textContent;
    expect(headline).toContain("I'm a Developer");
  });

  it('should display the correct location in the hero text', () => {
    const compiled = fixture.nativeElement;
    const locationText = compiled.querySelector('.hero-text').textContent;
    expect(locationText).toContain('Based in Kanpur, Uttar Pradesh.');
  });

  it('should have a "Let\'s Start" button with the correct href', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.btn-primary');
    expect(button).toBeTruthy();

    const hrefAttribute = button.getAttribute('href');
    expect(hrefAttribute).toBe('/contact');
  });
});
