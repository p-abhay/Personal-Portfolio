import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  title = 'Contact';
  constructor(private titleService: Title) {}
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  sendEmail(e: Event) {
    //e.preventDefault();

    emailjs
      .sendForm('abhay-gmail', 'template_1', e.target as HTMLFormElement, {
        publicKey: 'Q0X87M2Clf6Vbb5ou',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          console.log(e, ' he ', e.target);
          alert('Message Sent Successfully');
          this.ngOnInit();
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        }
      );
  }
}
