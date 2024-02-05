import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [Title],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;

    // Mock emailjs module and its sendForm method
    spyOn(emailjs, 'sendForm').and.returnValue(
      Promise.resolve({} as EmailJSResponseStatus)
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title correctly', () => {
    const titleService = TestBed.inject(Title);
    const spySetTitle = spyOn(titleService, 'setTitle');
    component.ngOnInit();
    expect(spySetTitle).toHaveBeenCalledWith('Contact');
  });

  it('should send an email successfully', async () => {
    const fakeEvent = {
      target: document.createElement('form'), // Create a mock form element
    } as unknown as Event;

    // Call the sendEmail method
    component.sendEmail(fakeEvent);

    // Wait for the asynchronous code to complete
    await fixture.whenStable();

    // Expectations
    expect(emailjs.sendForm).toHaveBeenCalledOnceWith(
      'abhay-gmail',
      'template_1',
      jasmine.any(HTMLFormElement),
      { publicKey: 'Q0X87M2Clf6Vbb5ou' }
    );
  });
});
