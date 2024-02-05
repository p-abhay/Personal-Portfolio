import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNotFoundComponent } from './page-not-found.component';
import { Title } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let titleService: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [RouterTestingModule],
      providers: [Title],
    });

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title to "404 - Page Not Found"', () => {
    spyOn(titleService, 'setTitle');
    fixture.detectChanges();
    expect(titleService.setTitle).toHaveBeenCalledWith('404 - Page Not Found');
  });

  it('should display error message and link to home', () => {
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    const backLink = fixture.nativeElement.querySelector('.back-link');

    expect(errorMessage.textContent).toContain('404 - Page Not Found');
    expect(backLink.getAttribute('href')).toBe('/');
  });
});
